import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({  
    productId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true 
    },
    quantity: { 
        type: Number, 
        required: true 
    },
    price: { 
        type: mongoose.Schema.Types.Decimal128, 
        required: true 
    },
    gallonType: {
        type: String,
        enum: ['new', 'refill'],
        required: true
    }
});

const OrderItem = mongoose.model('OrderItem', orderItemSchema);

export default OrderItem;