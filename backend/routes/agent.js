import express from "express";
const router = express.Router();

// Example agent route
router.get("/", (req, res) => {
  res.json({ message: "Agent dashboard route working!" });
});

export default router;
