const {Schema,model} = require('mongoose')

const commentSchema = new Schema({
    articleId: { type: Schema.Types.ObjectId, ref: 'Article', required: [true,"articleId must not be empty"] },
    userId: { type:Schema.Types.ObjectId, ref: 'User', required: [true,"userId must not be empty"] },
    commentText: { type: String, required: [true,"commentText must not be empty"] },
},{timestamps:true})

const Comment = model('Comment', commentSchema)


module.exports = Comment
