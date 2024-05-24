const Article = require("../models/article");

exports.createArticle = async (req, res) => {
    try {
        const newArticle = new Article(req.body);
        const savedArticle = await newArticle.save();
        res.status(201).json(savedArticle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find().populate('authorId').populate('categoryId').populate('subcategoryId');
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getArticleById = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id).populate('authorId').populate('categoryId').populate('subcategoryId');
        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateArticleById = async (req, res) => {
    try {
        const updatedArticle = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedArticle) {
            return res.status(404).json({ message: "Article not found" });
        }
        res.status(200).json(updatedArticle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteArticleById = async (req, res) => {
    try {
        const deletedArticle = await Article.findByIdAndDelete(req.params.id);
        if (!deletedArticle) {
            return res.status(404).json({ message: "Article not found" });
        }
        res.status(200).json({ message: "Article deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
