const express = require("express");
const router = express.Router();

const AnalyticsController = require("../controllers/analytics");
const { authenticateJwtToken, verifyAdminOrNot } = require("../middlewares/auth");

// Create a new view for an article
router.post("/createView",authenticateJwtToken, verifyAdminOrNot('superadmin'), AnalyticsController.createArticleView);

// Get Analytics
router.get("/getAnalytics",authenticateJwtToken, verifyAdminOrNot('superadmin'), AnalyticsController.getAnalytics);


module.exports = router;
