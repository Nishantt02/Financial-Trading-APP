import express from "express";
import { signup, login } from "../Controllers/UserControllers.js";
import multer from "multer";

const router = express.Router(); // Make sure this exists

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

router.post("/signup", upload.single("kycDocument"), signup);
router.post("/login", login);

export default router;
