const {Schema,model}=require("mongoose")

const articleSchema = new Schema({
    title:{type:String,required:[true,"title must not be empty"]},
    content:{type:String,required:[true,"content must not be empty"]}
})