const Analytics = require("../models/analytics");

exports.createArticleView = async (req, res) => {
    try {
        const newView = new Analytics(req.body);
        const savedView = await newView.save();
        res.status(201).json(savedView);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
