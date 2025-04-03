import User from "../models/user.js";
import mongoose from "mongoose";

export const getUser = async (req, res) => {
  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const startIndex = (page - 1 ) * limit;
    const users = await User.find().sort({createdAt: -1}) // Sort by createdAt in descending order
    .skip(startIndex).limit(limit);

    const total = await User.countDocuments();
    const totalPage = Math.ceil(total / limit);
    res.status(200).json({ page, limit, total, totalPages: totalPage ,  users });
  } catch (error) {
    console.error("error om fetching users:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createUser = async (req, res) => {
  const user = req.body;

  if (!user.name || !user.age || !user.address) {
    return res.status(400).json({ success: false, message: "Please provide all fields" });
  }

  const newUser = new User(user);

  try {
    await newUser.save();
    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.error("Error is Create user:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updatedUser = async (req, res) => {
  const { id } = req.params;

  const user = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid User Id" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(id, user, {
      new: true,
    });
    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteUser= async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid User Id" });
  }

  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product User" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
