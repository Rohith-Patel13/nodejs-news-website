const express = require("express");
const router = express.Router();

const CategoriesController = require("../controllers/categories");
const { authenticateJwtToken, verifyAdminOrNot } = require("../middleware/auth");

// Create a new category
router.post("/create", authenticateJwtToken, verifyAdminOrNot('superadmin'), CategoriesController.createCategory);

// Get all categories
router.get("/getAll", CategoriesController.getAllCategories);

// Update a category by id
router.put("/update/:id", authenticateJwtToken, verifyAdminOrNot('superadmin'), CategoriesController.updateCategoryById);

// Delete a category by id
router.delete("/delete/:id", authenticateJwtToken, verifyAdminOrNot('superadmin'), CategoriesController.deleteCategoryById);

module.exports = router;
