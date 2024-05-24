const express = require("express");
const router = express.Router();

const NotificationsController = require("../controllers/notification");
const { authenticateJwtToken } = require("../middlewares/auth");


// Get all notifications for a user
router.get("/getAllNotifications", authenticateJwtToken, NotificationsController.getAllNotificationsForUser);

module.exports = router;
