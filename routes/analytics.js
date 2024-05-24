const express = require("express");
const router = express.Router();

const AnalyticsController = require("../controllers/analytics");

// Create a new view for an article
router.post("/createView", AnalyticsController.createArticleView);

module.exports = router;
