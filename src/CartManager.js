import fs from 'fs';


class CartManager{
    constructor(path) {
        this.path = path;

    }

    generateNewId = (carts) => {
        if (carts.length > 0) {
            return carts[carts.length - 1 ].id +1;
        }else{
            return 1;
        }
    };
     
    async addCart(){
        try {
            const fileData = await fs.promises.readFile(this.path, "utf-8");
            const carts = JSON.parse(fileData);

            const id = this.generateNewId(carts);
            const newCArt = {id, products: [] };
            carts.push(newCArt);

            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2), "utf-8");
            return newCArt

        } catch (error) {
            throw new Error("Error al crear el carrito -" + error.message);
            
        }
    }

    async getProductsInCartById(cid){
        try {
            const fileData = await fs.promises.readFile(this.path, "utf-8");
            const carts = JSON.parse(fileData);

            const cart = carts.find((c) => c.id === parseInt(cid));
            if(!cart) throw new Error("Carrito no enconrtado")
            
            return cart.products;

        } catch (error) {
            throw new Error ("Error al obtener los productos del carrito - " + error.message);
            
        }
    } 
async addProductInCart(cid, pid, quantity) {
    try {
        const fileData = await fs.promises.readFile(this.path, "utf-8");
        const carts = JSON.parse(fileData);

        const cart = carts.find((c) => c.id == parseInt(cid));
        if (!cart) return null;

        const existingProduct = cart.products.find((p) => p.product === parseInt(pid));
        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.products.push({ product: parseInt(pid), quantity });
        }

        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2), "utf-8");
        return cart;

    } catch (error) {
        throw new Error("Error al agregar el producto al carrito - " + error.message);
    }
}


}

export default CartManager;