const express = require("express");
const router = express.Router();
const Parcel = require("../models/Parcel"); 
router.post("/", async (req, res) => {
  try {
    const newParcel = new Parcel(req.body);
    const savedParcel = await newParcel.save();
    res.status(201).json(savedParcel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const parcels = await Parcel.find().populate("customerId", "name email"); 
    res.status(200).json(parcels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const parcel = await Parcel.findById(req.params.id).populate(
      "customerId",
      "name email"
    );
    if (!parcel) return res.status(404).json({ message: "Parcel not found" });
    res.status(200).json(parcel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedParcel = await Parcel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedParcel)
      return res.status(404).json({ message: "Parcel not found" });
    res.status(200).json(updatedParcel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedParcel = await Parcel.findByIdAndDelete(req.params.id);
    if (!deletedParcel)
      return res.status(404).json({ message: "Parcel not found" });
    res.status(200).json({ message: "Parcel deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
