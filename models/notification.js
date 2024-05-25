const {Schema,model} = require('mongoose')

const notificationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: [true,"userId must not be empty"] },
  message: { type: String, required: [true,"message must not be empty"] },
  sentTo: {
    type:Array,
    required:[true,"list of emails must not be empty"],
  },
  sentAt: { type: Date, default: Date.now },
},{timestamps:true})
const Notification = model('Notification', notificationSchema)

module.exports = Notification
