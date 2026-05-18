import mongoose from "mongoose";

const healthFoodSchema = new mongoose.Schema(
  {
    query: { type: String, required: true, unique: true },
    recommended: { type: [String], required: true },
    avoid: { type: [String], required: true }
  },
  { timestamps: true }
);

export default mongoose.model(
  "HealthFood",
  healthFoodSchema,
  "health_foods"
);
