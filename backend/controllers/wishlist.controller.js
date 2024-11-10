import Wishlist from "../models/wishlist.model.js";
import Product from "../models/product.model.js";

// Kullanıcının wishlist'ini getir
export const getUserWishlist = async (req, res) => {
  try {
    const { userId } = req.params;

    const wishlist = await Wishlist.findOne({ userId }).populate({
      path: "items.productId",
      select: "name price imageUrl",
    });

    if (!wishlist) {
      return res.status(404).json({ success: false, message: "Wishlist not found" });
    }

    const populateWishlistItems = wishlist.items.map((item) => ({
      productId: item.productId._id,
      name: item.productId.name,
      price: item.productId.price,
      imageUrl: item.productId.imageUrl,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...wishlist._doc,
        items: populateWishlistItems,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Wishlist'e ürün ekle
export const addToWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = new Wishlist({ userId, items: [{ productId }] });
    } else {
      const productExists = wishlist.items.some((item) => item.productId.toString() === productId);
      if (productExists) {
        return res.status(400).json({ success: false, message: "Product is already in wishlist" });
      }
      wishlist.items.push({ productId });
    }

    await wishlist.save();
    res.status(201).json({ success: true, data: wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Wishlist'teki bir ürünü kaldır
export const removeFromWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    if (!userId || !productId) {
      return res.status(400).json({ success: false, message: "Invalid data provided!" });
    }

    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      return res.status(404).json({ success: false, message: "Wishlist not found" });
    }

    wishlist.items = wishlist.items.filter((item) => item.productId.toString() !== productId);
    await wishlist.save();

    res.status(200).json({ success: true, message: "Product removed from wishlist", data: wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Kullanıcının wishlist'ini temizle
export const clearWishlist = async (req, res) => {
  try {
    const { userId } = req.params;

    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      return res.status(404).json({ success: false, message: "Wishlist not found" });
    }

    wishlist.items = [];
    await wishlist.save();

    res.status(200).json({ success: true, message: "Wishlist cleared", data: wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
