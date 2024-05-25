// controllers/analytics.js
const Analytics = require("../models/analytics");
const Comment = require("../models/comment");
const User = require("../models/users");


exports.createArticleView = async (requestObject, responseObject) => {
    try {
        const { articleId } = requestObject.body;

        // Count the number of comments for the article
        const commentCount = await Comment.countDocuments({ articleId });

        // Count the total number of registered users
        const totalUserCount = await User.countDocuments();

        // Create the analytics entry
        const newView = await Analytics.create({
            articleId,
            viewCountOnArticle: commentCount,
            totalRegisteredUsers: totalUserCount
        });

        responseObject.status(201).send(newView);
    } catch (error) {
        responseObject.status(500).send({ error: error.message });
    }
};
