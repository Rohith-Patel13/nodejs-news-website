const express = require("express");
const router = express.Router();

const ArticlesController = require("../controllers/article");
const { authenticateJwtToken, verifyAdminOrNot } = require("../middlewares/auth");

// Create a new article
router.post("/createArticle", authenticateJwtToken, verifyAdminOrNot('superadmin'), ArticlesController.createArticle);

// Get all articles
router.get("/getAllArticles", ArticlesController.getAllArticles);

// Get an article by id
router.get("/getArticleById/:id", ArticlesController.getArticleById);

// Update an article by id
router.put("/updateArticleById/:id", authenticateJwtToken, verifyAdminOrNot('superadmin'), ArticlesController.updateArticleById);

// Delete an article by id
router.delete("/deleteArticleById/:id", authenticateJwtToken, verifyAdminOrNot('superadmin'), ArticlesController.deleteArticleById);

// Search articles
router.get("/searchArticles", ArticlesController.searchArticles);

module.exports = router;
