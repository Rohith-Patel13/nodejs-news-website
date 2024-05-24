const Analytics = require("../models/analytics");


exports.createArticleView = async (requestObject, responseObject) => {
    try {
        const newView = await Analytics.create(requestObject.body);
        responseObject.status(201).send(newView);
    } catch (error) {
        responseObject.status(500).send({ error: error.message });
    }
};
