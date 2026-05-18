import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import {
  addHealthFood,
  bulkAddHealthFood,
  updateHealthFood,
  deleteHealthFood
} from "../controllers/healthFoodController.js";

const router = express.Router();

router.post("/", adminAuth, addHealthFood);
router.post("/bulk", adminAuth, bulkAddHealthFood);
router.put("/", adminAuth, updateHealthFood);
router.delete("/", adminAuth, deleteHealthFood);

export default router;
