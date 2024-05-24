const {Schema,model} = require('mongoose')

const analyticsSchema = new mongoose.Schema({
  articleId: { type: Schema.Types.ObjectId, ref: 'Article', required: [true,"articleId must not be empty"] },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: [true,"userId must not be empty"] },
  viewCount: { type: Number, default: 0 },
},{timestamps:true})

const Analytics = mongoose.model('Analytics', analyticsSchema)

module.exports = Analytics
