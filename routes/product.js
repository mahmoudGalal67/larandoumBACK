import express from "express";
import {
  addProduct,
  productType,
  productCategory,
  getProduct,
  deleteProduct,
  productSizes,
  productImages,
  productColors,
  addProductcolors,
  addProductimages,
  addProductsizes,
  deleteColors,
  deleteImages,
  deleteSizes,
  addGiftAndFragrance,
  getGift,
} from "../controllers/product.js";

const router = express.Router();

router.post("/add", addProduct);
router.post("/gifts/add", addGiftAndFragrance);
router.post("/colors/add", addProductcolors);
router.post("/images/add", addProductimages);
router.post("/sizes/add", addProductsizes);
router.get("/type", productType);
router.get("/category", productCategory);
router.get("/product/:id", getProduct);
router.get("/gift/:id", getGift);
router.delete("/product/:id", deleteProduct);
router.get("/colors/:id", productColors);
router.delete("/colors/:id", deleteColors);
router.get("/images/:id", productImages);
router.delete("/images/:id", deleteImages);
router.get("/sizes/:id", productSizes);
router.delete("/sizes/:id", deleteSizes);

export default router;
