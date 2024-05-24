const express = require("express");
const router = express.Router();

const CategoriesController = require("../controllers/category");
const { authenticateJwtToken, verifyAdminOrNot } = require("../middlewares/auth");


// Create a new category
router.post("/createCategory", authenticateJwtToken, verifyAdminOrNot('superadmin'), CategoriesController.createCategory);

// Get all categories
router.get("/getAllCategory", CategoriesController.getAllCategories);

// Update a category by id
router.put("/updateCategory/:id", authenticateJwtToken, verifyAdminOrNot('superadmin'), CategoriesController.updateCategoryById);

// Delete a category by id
router.delete("/deleteCategory/:id", authenticateJwtToken, verifyAdminOrNot('superadmin'), CategoriesController.deleteCategoryById);

module.exports = router;
