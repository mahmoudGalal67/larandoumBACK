import express from "express";
import {
  addCart,
  getCart,
  deleteCartItem,
  deleteCartProduct,
} from "../controllers/cart.js";

const router = express.Router();

router.get("/:userId", getCart);
router.post("/:userId", addCart);
router.delete("/:id/:userId", deleteCartItem);
router.delete("/:id", deleteCartProduct);

export default router;
