const express = require("express");
const router = express.Router();

const SubscriptionsController = require("../controllers/subscription");
const { authenticateJwtToken } = require("../middlewares/auth");

// Create a new subscription
router.post("/createSubscription", authenticateJwtToken, SubscriptionsController.createSubscription);

module.exports = router;
