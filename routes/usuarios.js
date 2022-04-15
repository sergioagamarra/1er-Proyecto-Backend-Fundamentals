const express = require("express")
const path = require("path")
const UserController = require("../controllers/usuario.js")

const router = express.Router()
const userController = new UserController()

function views(document){
    return path.join(__dirname,"../","views",document)
}

router.get('/', (req,res) => {
    return res.sendFile(views("index.html"))
})

router.post("/api/registrar-usuario", async (req, res) => {
    console.log(req.body)
    const usuario = req.body
    const registro = await userController.create(usuario)
    if(registro.success){
        return res.redirect("/")
    }else{
        console.log("Error");
    }
 })

router.get("/api/mostrar-usuarios", async (req, res) => {
    var usuarios = await userController.readAll()
    return res.json(usuarios)
})

router.get("/api/mostrar-usuario/:id", async (req, res) => {
    const id = req.params.id
    var usuario = await userController.readOne(id)
    return res.json(usuario)
})

router.post("/api/editar-usuario/:id", async (req,res)=>{
    const id = req.params.id
    const usuario = req.body
    const result = await userController.update(usuario, id)
    // var usuarios = await userController.readAll()
    if(result.success){
        return res.redirect("/")
    }else{
        console.log(id);
        console.log(result);
    }

})

router.delete("/api/eliminar-usuario/:id", async (req, res) => {
    const id = req.params.id
    var usuario = await userController.delete(id)
    var usuarios = await userController.readAll()
    return res.json(usuarios)
})

module.exports = router