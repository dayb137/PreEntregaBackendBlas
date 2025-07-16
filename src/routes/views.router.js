import express from "express";
import Product from "../models/product.model.js";

const viewsRouter = express.Router()

viewsRouter.get("/", async(req, res) =>{
    try{

        const { limit = 5, page = 1, sort, category, available } = req.query;
        
        const options = {
          limit: parseInt(limit),
          page: parseInt(page),
          lean: true
        };
    
        if (sort) {
          options.sort = { price: sort === "asc" ? 1 : -1 };
        }
    
        const filter = {};
        if (category) filter.category = category;
        if (available !== undefined) filter.status = available === "true";
    
        const data = await Product.paginate(filter, options);
        const cartId = "68772a0832260a2afa1c4e92"; 
        
        const links = [];
        for (let i = 1; i <= data.totalPages; i++) {
          links.push({text: i, link: `?limit=${limit}&page=${i}`});
        }
    
        res.render("home", {...data, products: data.docs, links, cartId});
        
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
        
});

viewsRouter.get("/realTimeProducts", async(req, res) =>{
    try{
        const products = await Product.find().lean();
        res.render("realTimeProducts", { products });
    }catch(error){
        res.status(500).send({message: error.message});
    }
});

viewsRouter.get("/products/:pid", async (req, res) => {
    try {

        const { pid } = req.params;
        const product = await Product.findById(pid).lean();
        const cartId = ""; 

        if (!product) {
          return res.status(404).send("Producto no encontrado");
        }
    
        res.render("productDetail", { product, cartId: "68772a0832260a2afa1c4e92" });
    } catch (error) {
        res.status(500).send({ message: error.message });
      }
    
});


export default viewsRouter;
