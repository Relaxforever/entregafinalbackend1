const express = require("express");
const router = express.Router();
//const CheckAdmin = require('../middlewares/checkAdmin');
const CarritoProd = require("../../ClaseCarrito");
const ProductosCont = require('../../Desafio 3 Clase')

const ContenedorEx =  new ProductosCont('texto1.txt')
const CarritoCont = new CarritoProd("carritos.txt");


router.get("/", async (req, res) => {
    const ListCarts = await CarritoCont.getAll();
    return res.send(ListCarts);

});

router.get("/:id/productos", async (req, res) => {
    const checkId = parseInt(req.params.id)
    const ListCarts = await CarritoCont.productsByCartId(checkId);
    return res.send(ListCarts);
});

router.post("/", async (req, res) => {
        await CarritoCont.save();
        const arrayAll = await CarritoCont.getAll()
        return res.send( arrayAll[arrayAll.length - 1])
    })


router.post("/:id/productos/:id_prod", async (req, res) => {
    const producto = await ContenedorEx.getById(parseInt(req.params.id_prod));
    console.log(producto)
    console.log(req.params.id_prod)
    await CarritoCont.addCartProduct(parseInt(req.params.id), producto);

    const getProductsCart = await CarritoCont.productsByCartId(parseInt(req.params.id_prod))
    res.send(getProductsCart);
})

router.delete("/:id/productos/:id_prod", async (req, res) => {
    await CarritoCont.deleteCartProduct(parseInt(req.params.id), parseInt(req.params.id_prod));

    const getProductsCart = await CarritoCont.productsByCartId(parseInt(req.params.id))
    res.send(getProductsCart);
})

router.delete("/:id", async (req, res) => {

    await CarritoCont.deleteById(parseInt(req.params.id))
    res.sendStatus(200)
})
module.exports = router;

