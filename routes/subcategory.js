const express = require("express");
const router = express.Router();

const SubcategoriesController = require("../controllers/subcategories");
const { authenticateJwtToken, verifyAdminOrNot } = require("../middleware/auth");

// Create a new subcategory
router.post("/create", authenticateJwtToken, verifyAdminOrNot('superadmin'), SubcategoriesController.createSubcategory);

// Get all subcategories
router.get("/getAll", SubcategoriesController.getAllSubcategories);

// Update a subcategory by id
router.put("/update/:id", authenticateJwtToken, verifyAdminOrNot('superadmin'), SubcategoriesController.updateSubcategoryById);

// Delete a subcategory by id
router.delete("/delete/:id", authenticateJwtToken, verifyAdminOrNot('superadmin'), SubcategoriesController.deleteSubcategoryById);

module.exports = router;
