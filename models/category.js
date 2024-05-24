const {Schema,model} = require("mongoose")

const categorySchema = new Schema({
    categoryName:{
        type:String,
        required:[true,
        "categoryName must not be empty"]
    }
},{timestamps:true})

const Category = model('Category', categorySchema)
module.exports =Category
