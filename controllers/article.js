const mongoose = require('mongoose');
const Article = require("../models/article");
const User = require("../models/users")
const Notification = require("../models/notification")
const sendEmailId = require("../utils/sendEmail");




exports.createArticle = async (requestObject, responseObject) => {
    const session = await mongoose.startSession();

    try {
        await session.withTransaction(async () => {
            const newArticle = await Article.create(requestObject.body, { session });
            if (newArticle) {
                const users = await User.find({}, "email").lean();
                for (let user of users) {
                    const { _id, email } = user;
                    const notificationsRecord = await Notification.create({
                        userId: _id,
                        message: `New article "${newArticle.title}" has been published.`,
                        sentTo: email
                    }, { session });
                    await sendEmailId(notificationsRecord.sentTo, "New Article Published", notificationsRecord.message);
                }
            }
            responseObject.status(201).send(newArticle);
        });
    } catch (error) {
        responseObject.status(500).send({ error: error.message });
    } finally {
        session.endSession();
    }
};




exports.getAllArticles = async (requestObject, responseObject) => {
    try {
        const articles = await Article.find().populate('authorId').populate('categoryId').populate('subcategoryId');
        responseObject.status(200).send(articles);
    } catch (error) {
        responseObject.status(500).send({ error: error.message });
    }
};



exports.getArticleById = async (requestObject, responseObject) => {
    try {
        const article = await Article.findById(requestObject.params.id).populate('authorId').populate('categoryId').populate('subcategoryId');
        if (!article) {
            return responseObject.status(404).send({ message: "Article not found" });
        }
        responseObject.status(200).send(article);
    } catch (error) {
        responseObject.status(500).send({ error: error.message });
    }
};




exports.updateArticleById = async (requestObject, responseObject) => {
    const session = await mongoose.startSession();

    try {
        await session.withTransaction(async () => {
            const updatedArticle = await Article.findByIdAndUpdate(requestObject.params.id, requestObject.body, { new: true, session });
            if (!updatedArticle) {
                return responseObject.status(404).send({ message: "Article not found" });
            }
            const users = await User.find({}, "email").lean();
            for (let user of users) {
                const { _id, email } = user;
                const notificationsRecord = await Notification.create({
                    userId: _id,
                    message: `Article "${updatedArticle.title}" has been updated.`,
                    sentTo: email
                }, { session });
                await sendEmailId(notificationsRecord.sentTo, "Article Updated", notificationsRecord.message);
            }
            responseObject.status(200).send(updatedArticle);
        });
    } catch (error) {
        responseObject.status(500).send({ error: error.message });
    } finally {
        session.endSession();
    }
};




exports.deleteArticleById = async (requestObject, responseObject) => {
    try {
        const deletedArticle = await Article.findByIdAndDelete(requestObject.params.id);
        if (!deletedArticle) {
            return responseObject.status(404).send({ message: "Article not found" });
        }
        responseObject.status(200).send({ message: "Article deleted successfully" });
    } catch (error) {
        responseObject.status(500).send({ error: error.message });
    }
};


// Search Functionality: Search articles by title, content, category, tags
exports.searchArticles = async (requestObject, responseObject) => {
    try {
        const { keyword } = requestObject.query;
        const articles = await Article.find({
            $or: [
                { title: { $regex: keyword, $options: "i" } }, // Search by title (case-insensitive)
                { content: { $regex: keyword, $options: "i" } }, // Search by content (case-insensitive)
                { tags: { $regex: keyword, $options: "i" } } // Search by tags (case-insensitive)
            ]
        }).populate('authorId').populate('categoryId').populate('subcategoryId');
        responseObject.status(200).send(articles);
    } catch (error) {
        responseObject.status(500).send({ error: error.message });
    }
};

