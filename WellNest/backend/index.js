import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import aiRoutes from "./routes/ai.js";
import authRoutes from "./routes/auth.js";
import adminHealthFood from "./routes/adminHealthFood.js";
import foodAdviceRoutes from "./routes/foodAdvice.js";
import adminUsers from "./routes/adminUsers.js";
import userGoalsRouter from "./routes/userGoals.js";
import calendarRoutes from "./routes/calendar.js";

dotenv.config();

const app = express();

/*  MIDDLEWARE  */

//  Express v5 compatible CORS
app.use(cors());

app.use(express.json());

/*  ROUTES  */

app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/admin/health-foods", adminHealthFood);
app.use("/api/food-advice", foodAdviceRoutes);
app.use("/api/admin", adminUsers);
app.use("/api/goals", userGoalsRouter);
app.use("/api/calendar", calendarRoutes);


/*  FALLBACK  */

app.use((req, res) => {
  res.status(200).send(" WellNest backend is running");
});

/*  DATABASE  */

connectDB();

/*  START SERVER  */

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(` Server running on port ${PORT}`);
});
