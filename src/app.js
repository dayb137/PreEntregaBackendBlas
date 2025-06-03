import express from "express";
import ProductManager from "./ProductManager.js";
import CartManager from "./CartManager.js";

const app = express();
const PORT = 8080;

app.use(express.json());

const productManager = new ProductManager("./src/products.json");
const cartManager = new CartManager("./src/Carts.json");

app.get("/api/products", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/products/:pid", async (req, res) => {
  try {
    const pid = parseInt(req.params.pid);
    const product = await productManager.getProductById(pid);
    res.status(200).json(product);
  } catch (error) {}
});

app.post("/api/products", async (req, res) => {
  try {
    const newProduct = req.body;
    const addedProduct = await productManager.addProduct(newProduct);
    res.status(201).json(addedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/api/products/:pid", async (req, res) => {
  try {
    const pid = parseInt(req.params.pid);
    const updates = req.body;
    const updatedProduct = await productManager.updateProductById(pid, updates);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/api/products/:pid", async (req, res) => {
  try {
    const pid = parseInt(req.params.pid);
    await productManager.deleteProductById(pid);
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.json({ error: "No se pudo eliminar el producto" });
  }
});












app.post("/api/carts", async (req, res) => {
  try {
    const carts = await cartManager.addCart();
    res.status(201).json({ message: "Carrito creado correctamente", carts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/carts/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const products = await cartManager.getProductsInCartById(cid);
    res.status(200).json({
      message: "Productos del carrito obtenidos correctamente",
      products,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

app.post("/api/carts/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const quantity = req.body.quantity;

    const updateCarts = await cartManager.addProductInCart(cid, pid, quantity);
    res.status(200).json({ message: "producto agregado", updateCarts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
