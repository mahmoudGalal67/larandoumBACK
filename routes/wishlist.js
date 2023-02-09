import express from "express";
import { deleteCartProduct } from "../controllers/cart.js";
import {
  addWishlist,
  getWishlist,
  deleteWishlistItem,
  deleteWishlistProduct,
} from "../controllers/wishlist.js";

const router = express.Router();

router.get("/:userId", getWishlist);
router.post("/:userId", addWishlist);
router.delete("/:id/:userId", deleteWishlistItem);
router.delete("/:id", deleteWishlistProduct);

export default router;
