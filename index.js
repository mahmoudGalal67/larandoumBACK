import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";

import authRouter from "./routes/auth.js";
import productsRouter from "./routes/product.js";
import cartRouter from "./routes/cart.js";
import wishlistRouter from "./routes/wishlist.js";

import { verifyAdmin } from "./midlleware/verifyDashboard.js";

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 52428800, fieldSize: 52428800 },
});
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    res.send("file uploaded");
  } catch (err) {
    res.send(err);
  }
});


app.get("/admin", verifyAdmin);

app.use("/auth", authRouter);
app.use("/products", productsRouter);
app.use("/cart", cartRouter);
app.use("/wishlist", wishlistRouter);

app.listen(5000, () => {
  console.log("Connected!");
});
