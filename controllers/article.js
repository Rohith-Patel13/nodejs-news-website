const Article = require("../models/article");


exports.createArticle = async (requestObject, responseObject) => {
    console.log(requestObject.body)
    try {
        const newArticle = await Article.create(requestObject.body);
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
