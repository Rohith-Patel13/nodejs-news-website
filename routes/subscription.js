const express = require("express");
const router = express.Router();

const SubscriptionsController = require("../controllers/subscriptions");
const { authenticateJwtToken } = require("../middleware/auth");

// Create a new subscription
router.post("/create", authenticateJwtToken, SubscriptionsController.createSubscription);

module.exports = router;
