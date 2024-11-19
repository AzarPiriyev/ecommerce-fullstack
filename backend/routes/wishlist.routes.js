import express from "express";
import { getUserWishlist, addToWishlist, removeFromWishlist } from "../controllers/wishlist.controller.js";


const router = express.Router();


router.get("/:userId", getUserWishlist);


router.post("/add", addToWishlist);


router.delete("/:userId/:productId", removeFromWishlist);

export default router;
