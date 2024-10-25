import express from "express";
import {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
} from "../controllers/user.controller.js"; // Adjust the path as necessary

const router = express.Router();

// Routes
router.post("/", createUser);          // Create a new user
router.get("/", getUsers);              // Get all users
router.get("/:id", getUserById);        // Get a user by ID
router.patch("/:id", updateUser);         // Update a user by ID
router.delete("/:id", deleteUser);      // Delete a user by ID

export default router;
