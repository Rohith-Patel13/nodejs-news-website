const {Schema,model} = require('mongoose')
const emailRegex=  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


const notificationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: [true,"userId must not be empty"] },
  message: { type: String, required: [true,"message must not be empty"] },
  sentTo: {
    type:String,
    required:[true,"email must not be empty"],
    validate:{
        validator:(email)=>emailRegex.test(email),
        message:(props)=>`${props.value} is not a valid email`
    }
  },
  sentAt: { type: Date, default: Date.now },
},{timestamps:true})
const Notification = model('Notification', notificationSchema)

module.exports = Notification
