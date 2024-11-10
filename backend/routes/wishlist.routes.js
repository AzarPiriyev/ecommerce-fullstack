import express from "express";
import { getUserWishlist, addToWishlist, removeFromWishlist } from "../controllers/wishlist.controller.js";


const router = express.Router();

// Route to get user's wishlist
router.get("/:userId", getUserWishlist);

// Route to add a product to wishlist
router.post("/add", addToWishlist);

// Route to remove a product from wishlist
router.delete("/:userId/:productId", removeFromWishlist);

export default router;
