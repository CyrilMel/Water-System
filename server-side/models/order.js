import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({ 
    orderId: { 
        type: String, 
        unique: true 
    },
    orderItems: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'OrderItem', 
        required: true 
    }],
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    total: { 
        type: Number 
    },
    paymentMethod: {    
        type: String, 
        required: true 
    },
    status: { 
        type: String, 
        default: 'Pending' 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

orderSchema.pre('save', async function (next) {
    if (!this.orderId) {
      const count = await mongoose.model('Order').countDocuments();
      this.orderId = 'ORD-' + String(count + 1).padStart(5, '0'); // e.g., ORD-00001
    }
    next();
});


const order = mongoose.model('Order', orderSchema);

export default order;