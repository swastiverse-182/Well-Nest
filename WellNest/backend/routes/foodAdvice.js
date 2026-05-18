import express from "express";
import { foodAdvice } from "../controllers/healthFoodController.js";

const router = express.Router();

router.get("/", foodAdvice);

export default router;
