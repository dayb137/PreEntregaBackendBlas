import express from "express";
import {engine} from "express-handlebars";
import { Server } from "socket.io";
import viewsRouter from "./routes/views.router.js";
import productRouter from "./routes/product.router.js";
import http from "http";
import ProductManager from "./ProductManager.js";


const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 8080;

app.use(express.json());
app.use(express.static("public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views","./src/views")

app.use("/", viewsRouter);
app.use("/api/products", productRouter)



const productManager = new ProductManager("./data/products.json")

io.on("connection", (socket) => {
  console.log("Usuario conectado");

  socket.on("addProduct", async (productData) =>{
    try{
      const newProduct = await productManager.addProduct(productData);
      io.emit("productAdded", newProduct);
    }catch (error){
      console.error("Error al agregar el producto", error);
    }
  });

  socket.on("deleteProduct", async (id) =>{
    try{
      await productManager.deleteProductById(id);
      const updatedProduct = await productManager.getProducts()
      io.emit("productsUpdated", updatedProduct);
    }catch (error){
      console.error("Error al eliminar el producto", error)
    }
  })

});





server.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
