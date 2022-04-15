const database = require("../database")
class UserController{
    async create(usuario){
        const results = await database.insert("usuario",usuario)
        console.log(results)
        return results
    }

    async readAll(){
        const usuarios = await database.query("SELECT * FROM usuario")
        return usuarios
    }
    async readOne(id){
        const usuario = await database.query("SELECT * FROM usuario WHERE id=?", [id])
        return usuario
    }

    async delete(id){
        const usuario = await database.del("usuario",id)
        return usuario
    }
    async update(data, id){
        const usuario = await database.update("usuario", data, id)
        return usuario
    }
}

module.exports = UserController