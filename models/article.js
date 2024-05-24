const {Schema,model}=require("mongoose")

const articleSchema = new Schema({
    title:{type:String,required:[true,"title must not be empty"]},
    content:{type:String,required:[true,"content must not be empty"]},
    authorId:{type:Schema.Types.ObjectId,ref:'User',required:[true,"authorId must not be empty"]},
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
    subcategoryId: { type: Schema.Types.ObjectId, ref: 'Subcategory' },
    tags: [String],
    publishedAt: { type: Date },
},{timestamps:true})

const Article = model('Article', articleSchema)

module.exports = Article
