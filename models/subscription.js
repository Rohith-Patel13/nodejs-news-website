const {Schema,model} = require('mongoose')

const subscriptionSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: [true,"userId must not be empty"] },
    subscriptionType: { type:String,enum: ['monthly', 'yearly'] , required: [true,"subscriptionType must not be empty"] },
    startDate: { type: Date, required: [true,"startDate must not be empty"] },
    endDate: { type: Date, required: [true,"endDate must not be empty"]  },
},{timestamps:true})

const Subscription = model('Subscription', subscriptionSchema)


module.exports = Subscription
