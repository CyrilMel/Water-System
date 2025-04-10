import Address from "../models/address.js";
import mongoose from "mongoose";
import User from "../models/user.js";

// GET all addresses
export const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({});
    res.status(200).json({ success: true, addresses });
  } catch (error) {
    console.error("Error fetching addresses:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createAddress = async (req, res) => {
  const { userId, street_no, brgy, city, region } = req.body;

  if (!userId || !street_no || !brgy || !city || !region) {
    return res.status(400).json({ success: false, message: "Please provide all fields" });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const newAddress = new Address({
    street_no,
    brgy,
    city,
    region,
  });

  try {
    const savedAddress = await newAddress.save();

    user.address_id = savedAddress._id;
    await user.save();

    res.status(201).json({
      success: true,
      message: "Address created and linked to user successfully",
      address: savedAddress,
    });
  } catch (error) {
    console.error("Error creating address:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// UPDATE an address
export const updateAddress = async (req, res) => {
  const { id } = req.params;
  const address = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Address Id" });
  }

  try {
    const updatedAddress = await Address.findByIdAndUpdate(id, address, { new: true });
    res.status(200).json({ success: true, address: updatedAddress });
  } catch (error) {
    console.error("Error updating address:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// DELETE an address
export const deleteAddress = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Address Id" });
  }

  try {
    await Address.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Address Deleted" });
  } catch (error) {
    console.error("Error deleting address:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
