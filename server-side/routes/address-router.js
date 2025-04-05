import express from "express";
import {getAddresses,createAddress,updateAddress,deleteAddress} from "../controllers/AddressController.js";

const router = express.Router();

router.get("/", getAddresses);
router.post("/", createAddress);
router.put("/:id", updateAddress);
router.delete("/:id", deleteAddress);

export default router;