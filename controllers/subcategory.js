const Subcategory = require("../models/subcategory");


exports.createSubcategory = async (requestObject, responseObject) => {
    try {
        const newSubcategory = await Subcategory(requestObject.body);
        
        responseObject.status(201).send(newSubcategory);
    } catch (error) {
        responseObject.status(500).send({ error: error.message });
    }
};



exports.getAllSubcategories = async (requestObject, responseObject) => {
    try {
        const subcategories = await Subcategory.find().populate('categoryId');
        responseObject.status(200).send(subcategories);
    } catch (error) {
        responseObject.status(500).send({ error: error.message });
    }
};


exports.updateSubcategoryById = async (requestObject, responseObject) => {
    try {
        const updatedSubcategory = await Subcategory.findByIdAndUpdate(requestObject.params.id, requestObject.body);
        if (!updatedSubcategory) {
            return responseObject.status(404).send({ message: "Subcategory not found" });
        }
        responseObject.status(200).send(updatedSubcategory);
    } catch (error) {
        responseObject.status(500).send({ error: error.message });
    }
};




exports.deleteSubcategoryById = async (requestObject, responseObject) => {
    try {
        const deletedSubcategory = await Subcategory.findByIdAndDelete(requestObject.params.id);
        if (!deletedSubcategory) {
            return responseObject.status(404).send({ message: "Subcategory not found" });
        }
        responseObject.status(200).send({ message: "Subcategory deleted successfully" });
    } catch (error) {
        responseObject.status(500).send({ error: error.message });
    }
};
