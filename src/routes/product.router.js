import express from "express";
import ProductManager from "../ProductManager.js";



const productRouter = express.Router()
const productManager = new ProductManager("./data/products.json");


productRouter.get("/", async(req, res) =>{
    try{
        const products = await productManager.getProducts();
        res.json(products)
    }catch(error){
        res.status(500).send({message: error.message});
    }
});

productRouter.get("/realTimeProducts", async(req, res) =>{
    try{
        const products = await productManager.getProducts();
        res.json(products);
    }catch(error){
        res.status(500).send({message: error.message});
    }
});




export default productRouter;
