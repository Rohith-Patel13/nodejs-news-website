const {Schema,model} = require('mongoose')

const subcategorySchema = new Schema({
  subcategoryName: { type: String, required:[true,
    "subcategoryName must not be empty"] },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: [true,"categoryId must not be empty"] },
},{timestamps:true})

const Subcategory = model('Subcategory', subcategorySchema)


module.exports = Subcategory
