import express from "express";
import http from "http";
import {engine} from "express-handlebars";
import { Server } from "socket.io";
import viewsRouter from "./routes/views.router.js";
import productRouter from "./routes/product.router.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server)
const PORT = 8080;

app.use(express.json());
app.use(express.static("public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views","./src/views")

app.use("/", viewsRouter);
app.use("/api/products", productRouter)





io.on("connection", (socket) => {
  console.log("Usuario conectado")

});

server.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
