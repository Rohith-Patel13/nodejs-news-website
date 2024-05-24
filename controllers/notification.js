const Notification = require("../models/notification");

exports.getAllNotificationsForUser = async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.user_id });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
