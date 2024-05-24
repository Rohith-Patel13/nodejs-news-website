const express = require("express");
const router = express.Router();

const SubcategoriesController = require("../controllers/subcategory");
const { authenticateJwtToken, verifyAdminOrNot } = require("../middlewares/auth");


// Create a new subcategory
router.post("/createSubCategory", authenticateJwtToken, verifyAdminOrNot('superadmin'), SubcategoriesController.createSubcategory);

// Get all subcategories
router.get("/getAllSubCategory", SubcategoriesController.getAllSubcategories);

// Update a subcategory by id
router.put("/updateSubCategory/:id", authenticateJwtToken, verifyAdminOrNot('superadmin'), SubcategoriesController.updateSubcategoryById);

// Delete a subcategory by id
router.delete("/deleteSubCategory/:id", authenticateJwtToken, verifyAdminOrNot('superadmin'), SubcategoriesController.deleteSubcategoryById);

module.exports = router;
