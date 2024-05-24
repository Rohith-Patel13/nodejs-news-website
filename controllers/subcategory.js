const Subcategory = require("../models/subcategory");

exports.createSubcategory = async (req, res) => {
    try {
        const newSubcategory = new Subcategory(req.body);
        const savedSubcategory = await newSubcategory.save();
        res.status(201).json(savedSubcategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllSubcategories = async (req, res) => {
    try {
        const subcategories = await Subcategory.find().populate('categoryId');
        res.status(200).json(subcategories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateSubcategoryById = async (req, res) => {
    try {
        const updatedSubcategory = await Subcategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSubcategory) {
            return res.status(404).json({ message: "Subcategory not found" });
        }
        res.status(200).json(updatedSubcategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteSubcategoryById = async (req, res) => {
    try {
        const deletedSubcategory = await Subcategory.findByIdAndDelete(req.params.id);
        if (!deletedSubcategory) {
            return res.status(404).json({ message: "Subcategory not found" });
        }
        res.status(200).json({ message: "Subcategory deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
