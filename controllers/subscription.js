const Subscription = require("../models/subscription");

exports.createSubscription = async (requestObject, responseObject) => {
    try {
        const newSubscription = await Subscription.create(requestObject.body);

        responseObject.status(201).send(newSubscription);
    } catch (error) {
        responseObject.status(500).send({ error: error.message });
    }
};
