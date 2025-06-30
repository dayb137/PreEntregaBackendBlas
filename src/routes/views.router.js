import express from "express";
import ProductManager from "../ProductManager.js";

const viewsRouter = express.Router()
const productManager = new ProductManager("./data/products.json");

viewsRouter.get("/", async(req, res) =>{
    try{
        const products = await productManager.getProducts();
        res.render("home", {products});
    }catch(error){
        res.status(500).send({message: error.message});
    }
});

viewsRouter.get("/realTimeProducts", async(req, res) =>{
    try{
        const products = await productManager.getProducts();
        res.render("realTimeProducts", {products});
    }catch(error){
        res.status(500).send({message: error.message});
    }
});




export default viewsRouter;
