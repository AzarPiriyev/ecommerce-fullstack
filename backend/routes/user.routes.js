import express from "express";
import {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
} from "../controllers/user.controller.js"; 

const router = express.Router();

// Routes
router.post("/", createUser);         
router.get("/", getUsers);             
router.get("/:id", getUserById);        
router.patch("/:id", updateUser);       
router.delete("/:id", deleteUser);     

export default router;
