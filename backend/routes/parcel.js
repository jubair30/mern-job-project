import express from "express";
const router = express.Router();

// Book a new parcel
router.post("/", (req, res) => {
  res.json({ message: "Parcel booked!" });
});

export default router;
