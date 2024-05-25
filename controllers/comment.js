const Comment = require("../models/comment");


exports.createComment = async (requestObject, responseObject) => {
    try {      
        const newComment = await Comment.create(requestObject.body);
        
        responseObject.status(201).send(newComment);
    } catch (error) {
        responseObject.status(500).send({ error: error.message });
    }
};



exports.getAllCommentsForArticle = async (requestObject, responseObject) => {
    try {
        const comments = await Comment.find({ articleId: requestObject.params.articleId }).populate('userId').populate('articleId');
        responseObject.status(200).send(comments);
    } catch (error) {
        responseObject.status(500).send({ error: error.message });
    }
};



exports.deleteCommentById = async (requestObject, responseObject) => {
    try {
        const deletedComment = await Comment.findByIdAndDelete(requestObject.params.id);
        if (!deletedComment) {
            return responseObject.status(404).send({ message: "Comment not found" });
        }
        responseObject.status(200).send({ message: "Comment deleted successfully" });
    } catch (error) {
        responseObject.status(500).send({ error: error.message });
    }
};
