const {Schema,model} = require('mongoose')

const analyticsSchema = new Schema({
  articleId: { type: Schema.Types.ObjectId, ref: 'Article', required: [true,"articleId must not be empty"] },
  viewCountOnArticle: { type: Number, default: 0 },
  totalRegisteredUsers:{type:Number,default:0}
},{timestamps:true})


const Analytics = model('Analytics', analyticsSchema)

module.exports = Analytics
