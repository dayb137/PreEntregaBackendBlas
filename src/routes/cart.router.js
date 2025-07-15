import express from "express";
import Cart from "../models/cart.model.js";

const cartRouter = express.Router();

cartRouter.post("/", async (req, res) =>{
    try{
        const cart = new Cart();
        await cart.save();
        res.status(201).json({ status: "succes", payload: cart});
    } catch(error){
        res.status(500).json({ message: error.message});
    }
});

cartRouter.get("/:cid", async (req, res) =>{
    try{
        const cid  = req.params.cid;
        const cart = await Cart.findById(cid).populate("products.product");

        if(!cart){
            return res.status(404).json({ status: "error", message: "Carrito no encontrado"});
        }
        res.json({ status: "succes", payload: cart });
    }catch(error){
        res.status(500).json({ status: "error", message: error.message });
    }

})

export default cartRouter;