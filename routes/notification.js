const express = require("express");
const router = express.Router();

const NotificationsController = require("../controllers/notifications");
const { authenticateJwtToken } = require("../middleware/auth");

// Get all notifications for a user
router.get("/getAll", authenticateJwtToken, NotificationsController.getAllNotificationsForUser);

module.exports = router;
