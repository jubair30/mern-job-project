const express = require("express");
const router = express.Router();
const Parcel = require("../models/Parcel");
const User = require("../models/User");

// ======================== GET Customer Parcels ========================
// Get all parcels for the logged-in customer
router.get("/:customerId/parcels", async (req, res) => {
  try {
    const parcels = await Parcel.find({
      customerId: req.params.customerId,
    }).sort({ createdAt: -1 });
    res.status(200).json(parcels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ======================== GET Single Parcel ========================
router.get("/:customerId/parcels/:parcelId", async (req, res) => {
  try {
    const parcel = await Parcel.findOne({
      _id: req.params.parcelId,
      customerId: req.params.customerId,
    });
    if (!parcel) return res.status(404).json({ message: "Parcel not found" });
    res.status(200).json(parcel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ======================== CREATE Parcel ========================
router.post("/:customerId/parcels", async (req, res) => {
  try {
    const newParcel = new Parcel({
      ...req.body,
      customerId: req.params.customerId,
    });
    const savedParcel = await newParcel.save();
    res.status(201).json(savedParcel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ======================== UPDATE Parcel ========================
router.put("/:customerId/parcels/:parcelId", async (req, res) => {
  try {
    const updatedParcel = await Parcel.findOneAndUpdate(
      { _id: req.params.parcelId, customerId: req.params.customerId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedParcel)
      return res
        .status(404)
        .json({ message: "Parcel not found or not authorized" });
    res.status(200).json(updatedParcel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ======================== DELETE Parcel ========================
router.delete("/:customerId/parcels/:parcelId", async (req, res) => {
  try {
    const deletedParcel = await Parcel.findOneAndDelete({
      _id: req.params.parcelId,
      customerId: req.params.customerId,
    });
    if (!deletedParcel)
      return res
        .status(404)
        .json({ message: "Parcel not found or not authorized" });
    res.status(200).json({ message: "Parcel deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
