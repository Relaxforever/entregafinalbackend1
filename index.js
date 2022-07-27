const path = require("path");
const cartRoute = require('./src/routes/carts')
const productRoute = require('./src/routes/products')
const express = require('express')


const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.use("/api/productos", productRoute );
app.use("/api/carrito", cartRoute);

app.get("/", (req, res) => {
    res.send('Los puertos que funcionan son /api/productos y api/carrito')
})


app.listen(PORT, () => {
    console.log('Servidor funcionando')
});

