import HealthFood from "../models/HealthFood.js";

// ADD
export const addHealthFood = async (req, res) => {
  try {
    const { query, recommended, avoid } = req.body;
    if (!query || !recommended || !avoid)
      return res.status(400).json({ error: "Missing fields" });

    const data = await HealthFood.create({
      query: query.toLowerCase().trim(),
      recommended,
      avoid,
    });

    res.status(201).json(data);
  } catch (err) {
    if (err.code === 11000)
      return res.status(409).json({ error: "Query already exists" });
    res.status(500).json({ error: "Server error" });
  }
};

// BULK ADD
export const bulkAddHealthFood = async (req, res) => {
  try {
    const formatted = req.body.map((i) => ({
      query: i.query.toLowerCase().trim(),
      recommended: i.recommended,
      avoid: i.avoid,
    }));

    const inserted = await HealthFood.insertMany(formatted, { ordered: false });
    res.status(201).json(inserted);
  } catch (err) {
    console.error("Bulk insert error:", err.message);
    res.status(500).json({ error: "Bulk insert failed" });
  }
};

// UPDATE
export const updateHealthFood = async (req, res) => {
  try {
    const { query, recommended, avoid } = req.body;

    const updated = await HealthFood.findOneAndUpdate(
      { query: query.toLowerCase().trim() },
      { recommended, avoid },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    console.error("Update error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// DELETE
export const deleteHealthFood = async (req, res) => {
  try {
    const { query } = req.body;

    const deleted = await HealthFood.findOneAndDelete({
      query: query.toLowerCase().trim(),
    });

    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// USER QUERY
export const foodAdvice = async (req, res) => {
  try {
    const q = req.query.q?.toLowerCase().trim();
    if (!q) return res.status(400).json({ error: "Query required" });

    const words = q.split(/\s+/);

    const data = await HealthFood.findOne({
      $or: words.map((w) => ({
        query: new RegExp(`\\b${w}\\b`, "i"),
      })),
    });

    if (!data) {
      return res.json({ source: "database", recommended: [], avoid: [] });
    }

    res.json({
      source: "rules",
      recommended: data.recommended,
      avoid: data.avoid,
    });
  } catch (err) {
    console.error("Food advice error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};
