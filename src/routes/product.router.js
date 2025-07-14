import express from "express";
import ProductManager from "../ProductManager.js";
import Product from "../models/product.model.js";



const productsRouter = express.Router()
const productManager = new ProductManager("./data/products.json");

productsRouter.get("/", async(req, res) =>{
    try{
        const products = await Product.find();
        res.status(200).json({ status: "sucess", payload: products})
    }catch(error){
        res.status(500).json({status: "error", message : "Error al recuperar los productos"});
    }
});

productsRouter.get("/", async(req, res) =>{
    try{
        const products = await productManager.getProducts();
        res.json(products)
    }catch(error){
        res.status(500).send({message: error.message});
    }
});

productsRouter.get("/realTimeProducts", async(req, res) =>{
    try{
        const products = await productManager.getProducts();
        res.json(products);
    }catch(error){
        res.status(500).send({message: error.message});
    }
});




export default productsRouter;
