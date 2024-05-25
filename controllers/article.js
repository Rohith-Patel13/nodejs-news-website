const Article = require("../models/article");
const User = require("../models/users")
const Notification = require("../models/notification")
const sendEmailId = require("../utils/sendEmail");




exports.createArticle = async (requestObject, responseObject) => {
    console.log(requestObject.body)
    try {
        const newArticle = await Article.create(requestObject.body);
        if(newArticle){
            // Fetch all registered users
            const users = await User.find({},"email").lean();// const users = [ { _id: '6090a0f0980df30015a9b9c7', email: 'user1@example.com' },{ _id: '6090a0f0980df30015a9b9c8', email: 'user2@example.com' },{ _id: '6090a0f0980df30015a9b9c9', email: 'user3@example.com' },// More user objects...];
            console.log(users)
            for(let user of users){
                console.log(user)
                const {_id,email} = user
                const notificationsRecord=await Notification.create({
                    userId:_id,message:`New article ${newArticle.title} has been published.`,
                    sentTo:email
                })
                await sendEmailId(notificationsRecord.sentTo,"New Article Published", notificationsRecord.message)
            }
        }
        responseObject.status(201).send(newArticle);
    } catch (error) {
        responseObject.status(500).send({ error: error.message });
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
    try {
        const updatedArticle = await Article.findByIdAndUpdate(requestObject.params.id, requestObject.body);
        if (!updatedArticle) {
            return responseObject.status(404).send({ message: "Article not found" });
        }
        // Fetch all registered users
        const users = await User.find({}, "email").lean();
        for (let user of users) {
            const { _id, email } = user;
            const notificationsRecord = await Notification.create({
                userId: _id,
                message: `Article "${updatedArticle.title}" has been updated.`,
                sentTo: email
            });
            await sendEmailId(notificationsRecord.sentTo, "Article Updated", notificationsRecord.message);
        }
        responseObject.status(200).send(updatedArticle);
    } catch (error) {
        responseObject.status(500).send({ error: error.message });
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
