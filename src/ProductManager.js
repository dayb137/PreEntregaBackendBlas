import fs from "fs";

class ProductManager {
  constructor(pathFile) {
    this.path = pathFile;
  }

  generateNewId(products) {
    if (products.length > 0) {
      return products[products.length - 1].id + 1;
    } else {
      return 1;
    }
  }

  async getProducts() {
    try {
      const fileData = await fs.promises.readFile(this.path, "Utf-8");
      const products = JSON.parse(fileData);
      return products;
    } catch (error) {
      throw new Error("Error al traeer los productos -" + error.message);
    }
  }

  async getProductById(id) {
    try {
      const fileData = await fs.promises.readFile(this.path, "Utf-8");
      const products = JSON.parse(fileData);

      const product = products.find((product) => product.id === parseInt(id));
      return product;
    } catch (error) {
      throw new Error("Error al obtener producto por ID - " + error.message);
    }
  }

  async addProduct(newProduct) {
    try {
      const fileData = await fs.promises.readFile(this.path, "utf-8");
      const products = JSON.parse(fileData);

      
      if (!newProduct.title || !newProduct.price || !newProduct.stock) {
        throw new Error("FAltan campos obligatorios");
      }

      const newId = this.generateNewId(products);
      const product = { id: newId, ...newProduct };

      products.push(product);

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, 2),
        "utf-8"
      );
      return products;
    } catch (error) {
      throw new Error("Error al añadir el producto " + error.message);
    }
  }

  async updateProductById(id, updateFields) {
    try {
      const fileData = await fs.promises.readFile(this.path, "utf-8");
      const products = JSON.parse(fileData);

      const index = products.findIndex((p) => p.id === parseInt(id));

      if (index === -1) {
        return null;
      }

      const updatedProduct = {
        ...products[index],
        ...updateFields,
        id: products[index].id,
      };

      products[index] = updatedProduct;

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, 2),
        "utf-8"
      );
      return products;
    } catch (error) {
      throw new Error("Error al actualizar el producto -" + error.message);
    }
  }

  async deleteProductById(id) {
    try {
      const fileData = await fs.promises.readFile(this.path, "utf-8");
      const products = JSON.parse(fileData);

      const index = products.findIndex((p) => p.id === parseInt(id));
      if (index === -1) throw new Error(`Producto con el Id: ${id} no existe`);

      products.splice(index, 1);

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, 2),
        "utf-8"
      );

      return products;
    } catch (error) {
      throw new Error("Error al eliminar el producto -" + error.message);
    }
  }
}

export default ProductManager;
