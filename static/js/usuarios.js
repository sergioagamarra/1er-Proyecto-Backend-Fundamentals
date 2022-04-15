let usersData = []
var usuarios = document.getElementById("registro")
var formulario = document.getElementById("content-form")

fetch("/api/mostrar-usuarios")
.then((res) => {
    return res.json()})
.then((data) => {
    usersData = data
    renderUsers()
}) 

function eliminar(id){
    fetch("/api/eliminar-usuario/"+id,{
        method:"DELETE"
    })
    .then((res)=>{
        return res.json()
    })
    .then((data)=>{
        usersData = data
        renderUsers()
    })
}

function buscarUsuario(id){
    fetch("/api/mostrar-usuario/"+id,{
        method:"GET"
    })
    .then((res)=>{
        return res.json()
    })
    .then((data)=>{ 
        renderForm(data)
    })
    
}

function renderUsers(){
    usuarios.innerHTML = `<thead>
    <tr>
        <th>id</th><th>Nombre</th><th>Edad</th><th>Género</th><th>Email</th><th>Profesión</th><th>Salario</th><th>Editar</th><th>Eliminar</th>
    </tr>
    </thead>`
    for(var user of usersData){
        usuarios.innerHTML = usuarios.innerHTML + `
        <tr>
            <td>${user.id}</td>
            <td>${user.nombre}</td>
            <td>${user.edad}</td>
            <td>${user.genero}</td>
            <td>${user.email}</td>
            <td>${user.profesion}</td>
            <td>${user.salario}</td>
            <td class="boton_center"> 
                <button class="boton_register" onClick="buscarUsuario(${user.id})">
                    <img class="logo_table" src="/img/editar.svg" alt="logo">
                </button> 
            </td>
            <td class="boton_center">
                <button class="boton_register" onClick="eliminar(${user.id})">
                    <img class="logo_table" src="/img/eliminar.svg" alt="logo">
                </button>
            </td>
        </tr>`
    }
}

function renderForm(user){
    
    formulario.innerHTML = `<form class="form-register" id="form" method="POST" action="/api/editar-usuario/${user[0].id}">
    <h4>Editar de Usuario</h4>
    <input class="controls" type="text" name="nombre" placeholder="Ingrese su Nombre" value="${user[0].nombre}">
    <input class="controls" type="number" name="edad" placeholder="Ingrese su Edad" value="${user[0].edad}">
    <select class="controls select" name="genero">
        <option>Seleccione su género</option>
        <option>MASCULINO</option>
        <option>FEMENINO</option>
        <option>LGBTQ</option>
        <option>NO BINARIO</option>
        <option>OTRO</option>
    </select>
    <input class="controls" type="email" name="email" placeholder="Ingrese su Email" value="${user[0].email}">
    <input class="controls" type="text" name="profesion" placeholder="Ingrese su Profesión" value="${user[0].profesion}">
    <input class="controls" type="number" name="salario" placeholder="Ingrese su Salario" value="${user[0].salario}">
    <input class="controls" type="password" name="contrasenia" placeholder="Ingrese su Contraseña" value="${user[0].contrasenia}">
    <button class="botons">Modificar</button>
</formv>`
}

