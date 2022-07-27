const express = require("express");
const router = express.Router();
const CheckAdmin = require('../middlewares/checkAdmin');
const ProductosCont = require('../../Desafio 3 Clase')
const ContenedorEx =  new ProductosCont('texto1.txt')


router.get("/:id?", async (req, res) => {

        const checkId = parseInt(req.params.id)

        if (checkId) {
            const RetrievedObj =  await ContenedorEx.getById(parseInt(req.params.id))
            if (RetrievedObj) {
                return res.send(RetrievedObj)
            } else {
                return res.send({"error": "Producto no Encontrado"})
            }
        } else {
            const ListProductos = await ContenedorEx.getAll();
            return res.send(ListProductos);
        }

    });

router.post("/",CheckAdmin("/api/productos/", "Crear Producto"),
    async (req, res) => {
        await ContenedorEx.save({...req.body, timestamp: Date.now()})
        const arrayAll = await ContenedorEx.getAll()
        return res.send( arrayAll[arrayAll.length - 1])
    })

router.delete(
    "/:id",
    CheckAdmin("/api/productos/:id", "Borrar Producto"),
    async (req, res) => {
        await ContenedorEx.deleteById(parseInt(req.params.id))
        return res.sendStatus(200)
    });


router.put(
    "/:id",
    CheckAdmin("/api/productos/:id", "Actualizar Producto"),
    async (req, res) => {
        console.log('cambiando')
        const updatedObject = await ContenedorEx.updateById(parseInt(req.params.id), req.body)
        return res.send(updatedObject)
    }
)

module.exports = router;