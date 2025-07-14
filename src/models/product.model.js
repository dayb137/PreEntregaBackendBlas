import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: { type: String, unique: true},
    price: Number,
    stock: Number,
    category: String,
    description: String,
    thumbnail: {type: String, default: ""},
    status: {
        type: Boolean,
        default: true,
        required: false,
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

const Product = mongoose.model("Product", productSchema);

export default Product;