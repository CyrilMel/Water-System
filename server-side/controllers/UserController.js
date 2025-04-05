import User from "../models/user.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs"; 

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
  const user = req.body; // Directly take all fields from the request body

  if (!user.name || !user.email || !user.password) {
    return res.status(400).json({ success: false, message: "Please provide all required fields" });
  }

  const existingUser = await User.findOne({ email: user.email });
  if (existingUser) {
    return res.status(400).json({ success: false, message: "Email is already in use" });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;

  // If address_id is provided, ensure it's either a valid ObjectId or null
  if (user.address_id === "null" || user.address_id === "") {
    user.address_id = null; // Set address_id to null if "null" string is passed
  }

  if (user.phone_no === "null" || user.phone_no=== "") {
    user.phone_no  = null; 
  }

  const newUser = new User(user);

  try {
    await newUser.save();
    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const updatedUser = async (req, res) => {
  const user = req.body;
  const { id } = req.params;

  // Check if the ObjectId is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid User Id" });
  }

  // Validate that required fields are present (name, email, phone_no)
  if (!user.name || !user.email || !user.phone_no) {
    return res.status(400).json({ success: false, message: "Please provide all required fields (name, email, phone_no)" });
  }

  // Check if email is already taken by another user
  const existingUser = await User.findOne({ email: user.email });
  if (existingUser && existingUser._id.toString() !== id) {
    return res.status(400).json({ success: false, message: "Email is already in use" });
  }

  // If password is provided, hash it
  if (user.password) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  }

  // Handle optional fields: phone_no and address_id
  if (user.phone_no === "null" || user.phone_no === "") {
    user.phone_no = null;
  }

  // If address_id is provided, validate it
  if (user.address_id === "null" || user.address_id === "") {
    user.address_id = null;
  }

  // Attempt to update the user in the database
  try {
    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });

    // Check if the user was updated
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error.message);
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
    res.status(200).json({ success: true, message: "User Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Please provide both email and password" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone_no: user.phone_no,
        address_id: user.address_id,  
      },
    });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};