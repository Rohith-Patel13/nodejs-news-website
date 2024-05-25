const Subscription = require("../models/subscription");
const User = require("../models/users");
const mongoose = require("mongoose");

/*
 if Subscription.create succeeds but User.findByIdAndUpdate fails, 
 your system can still end up in an inconsistent state.

 To ensure that both operations succeed together or fail together, 
 you can use MongoDB transactions. 
*/


exports.createSubscription = async (requestObject, responseObject) => {
    const session = await mongoose.startSession();

    try {
        await session.withTransaction(async () => {
            const { userId } = requestObject.body;

            // Ensure the user exists
            const user = await User.findById(userId).session(session);
            if (!user) {
                throw new Error("User not found");
            }

            // Create the subscription
            const newSubscription = await Subscription.create(
                [{ userId, ...requestObject.body }],
                { session }
            );

            // Update the user's subscription status to 'paid'
            await User.findByIdAndUpdate(userId, { subscriptionStatus: "paid" }, { session });

            responseObject.status(201).send(newSubscription);
        });
    } catch (error) {
        responseObject.status(500).send({ error: error.message });
    } finally {
        session.endSession();
    }
};


/*
The try...catch...finally statements combo handles errors without stopping JavaScript.
The try statement defines the code block to run (to try).
The catch statement defines a code block to handle any error.
The finally statement defines a code block to run regardless of the result.
The throw statement defines a custom error.
Both catch and finally are optional, but you must use one of them.
*/