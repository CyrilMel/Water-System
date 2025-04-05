import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone_no: {
    type: String,
    required: true,
  },
  // Adding the address reference
  address_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address", // reference to the Address model
    required: false,
  },
},{
    timestamps: true
});

const User = mongoose.model("User", userSchema);

export default User;