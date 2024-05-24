const Category = require("../models/category");



exports.createCategory = async (requestObject, responseObject) => {
    try {
        const newCategory = await Category.create(requestObject.body);
        responseObject.status(201).send(newCategory);
    } catch (error) {
        responseObject.status(500).send({ error: error.message });
    }
};



exports.getAllCategories = async (requestObject, responseObject) => {
    try {
        const categories = await Category.find();
        responseObject.status(200).send(categories);
    } catch (error) {
        responseObject.status(500).send({ error: error.message });
    }
};


exports.updateCategoryById = async (requestObject, responseObject) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(requestObject.params.id, requestObject.body);
        if (!updatedCategory) {
            return responseObject.status(404).send({ message: "Category not found" });
        }
        responseObject.status(200).send(updatedCategory);
    } catch (error) {
        responseObject.status(500).send({ error: error.message });
    }
};




exports.deleteCategoryById = async (requestObject, responseObject) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(requestObject.params.id);
        if (!deletedCategory) {
            return responseObject.status(404).send({ message: "Category not found" });
        }
        responseObject.status(200).send({ message: "Category deleted successfully" });
    } catch (error) {
        responseObject.status(500).send({ error: error.message });
    }
};
