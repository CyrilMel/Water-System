import express from "express";
import {getAddresses,createAddress,getAddressByUserId,updateAddress,deleteAddress} from "../controllers/AddressController.js";

const router = express.Router();

router.get("/", getAddresses);
router.get('/user/:userId', getAddressByUserId);
router.post("/", createAddress);
router.put("/:id", updateAddress);
router.delete("/:id", deleteAddress);

export default router;