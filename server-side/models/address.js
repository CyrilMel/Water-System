import mongoose from "mongoose";

const addressSchema = mongoose.Schema({
  street_no: {
    type: String,
    required: true,
  },
  brgy: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Address = mongoose.model("Address", addressSchema);

export default Address;
