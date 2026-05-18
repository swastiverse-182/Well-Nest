const adminAuth = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (apiKey !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};

export default adminAuth;
