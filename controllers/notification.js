const Notification = require("../models/notification");


exports.getAllNotificationsForUser = async (requestObject, responseObject) => {
    try {
        const notifications = await Notification.find({ userId: req.user_id });
        responseObject.status(200).send(notifications);
    } catch (error) {
        responseObject.status(500).send({ error: error.message });
    }
};
