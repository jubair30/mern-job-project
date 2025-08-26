import mongoose from "mongoose";

const parcelSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  pickupAddress: String,
  deliveryAddress: String,
  parcelType: String,
  paymentMode: { type: String, enum: ["COD", "Prepaid"], default: "COD" },
  status: { type: String, enum: ["Booked", "Picked Up", "In Transit", "Delivered", "Failed"], default: "Booked" },
}, { timestamps: true });

export default mongoose.model("Parcel", parcelSchema);
