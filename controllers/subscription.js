const Subscription = require("../models/subscription");

exports.createSubscription = async (req, res) => {
    try {
        const newSubscription = new Subscription(req.body);
        const savedSubscription = await newSubscription.save();
        res.status(201).json(savedSubscription);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
