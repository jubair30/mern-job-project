import express from "express";
const router = express.Router();

// Example customer route
router.get("/", (req, res) => {
  res.json({ message: "Customer dashboard route working!" });
});

export default router;
