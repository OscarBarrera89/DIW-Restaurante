"use strict";

// Codificar aquí el programa principal
var oRestaurante = new Restaurante();

registrarEventos();

function registrarEventos() {
    ocultarFormularios();

    //Parte de Cliente
    document.querySelector("#mnuAltaCliente").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuListadoCliente").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuBuscarCliente").addEventListener("click", mostrarFormulario);

    frmAltaCliente.btnAceptarAltaCliente.addEventListener("click", procesarAltaCliente);
    // frmModCliente.ModClienteBoton.addEventListener("click", procesarModificarCliente);
    // frmBuscarCliente.ModClienteBoton.addEventListener("click", procesarBuscarCliente);

    // //Parte de Pedido SIN TERMINAR
    // document.querySelector("#mnuAltaPedido").addEventListener("click",mostrarFormulario);
    // document.querySelector("#mnuListadoPedidosCliente").addEventListener("click",mostrarFormulario);

    // frmAltaPedido.btnAltaPedido.addEventListener("click",procesarAltaPedido);
    // frmListadoPedidosCliente.btnListadoPedidosCliente.addEventListener("click",procesarListadoPedidos)

    //Parte de Menu
    document.querySelector("#mnuAltaMenu").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuListadoMenu").addEventListener("click", mostrarFormulario);
    frmAltaMenu.btnAceptarAltaMenu.addEventListener("click", procesarAltaMenu);
}

function mostrarFormulario(oEvento){

    let opcion = oEvento.target.id;

    ocultarFormularios();

    switch (opcion) {
        case "mnuAltaCliente":
            frmAltaCliente.style.display = "block";
            break;
        case "mnuListadoCliente":
            listadoCliente.style.display = "block";
            procesarListadoPorCliente();
            break;
        case "mnuBuscarCliente":
            frmBuscarCliente.style.display = "block";
            break;
        case "mnuAltaMenu":
            frmAltaMenu.style.display = "block";
            break;
        case "mnuListadoMenu":
            frmListadoMenu.style.display = "block";
            frmListadoMenu.innerHTML = "";
            procesarListadoMenu();
            break;
        default:
            break;
    }
}

function ocultarFormularios(){
    frmAltaCliente.style.display = "none";
    frmAltaMenu.style.display = "none";
    frmListadoMenu.style.display = "none";
    //listadoCliente.style.display = "none";
    //frmModCliente.style.display = "none";
    
    //resultadoBusquedaCliente.innerHTML = "";
}

async function procesarAltaCliente() {
    let nombre = frmAltaCliente.txtNombre.value.trim();
    let email = frmAltaCliente.txtEmail.value.trim();   
    let telefono = parseInt(frmAltaCliente.txtNumero.value.trim());
    
    if (validarAltaCliente()) {
        let respuesta = await oRestaurante.altaCliente(new Cliente(null, nombre, email, telefono));
        alert(respuesta.mensaje);
        if (respuesta.ok) {
            frmAltaCliente.reset();
            ocultarFormularios();
        }
    }

}


function validarAltaCliente() {

    let nombre = frmAltaCliente.txtNombre.value.trim();
    let email = frmAltaCliente.txtEmail.value.trim();   
    let telefono = parseInt(frmAltaCliente.txtNumero.value.trim());
    let errores = "";
    let valido = true;

    if (nombre.length == 0){
        errores+= "Se requiere rellenar el nombre\n";
        valido = false;
        frmAltaCliente.txtNombre.classList.add("error")
    
    } else{
        frmAltaCliente.txtNombre.classList.remove("error")
        
    }

    if (email.length == 0){
        errores+= "Se requiere rellenar el email\n";
        valido = false;
        frmAltaCliente.txtEmail.classList.add("error")
    
    } else{
        frmAltaCliente.txtEmail.classList.remove("error")
        
    }

    if (isNaN(telefono)){
        errores+= "El telefono debe ser un numero\n";
        valido = false;
        frmAltaCliente.txtNumero.classList.add("error")
    
    } else{
        frmAltaCliente.txtNumero.classList.remove("error")
        
    }

    if (!valido) {
        alert(errores);
    }

    return valido;
}

async function procesarListadoPorCliente() {

    let respuesta = await oRestaurante.listadoCliente();

    let tabla = "<h2>Listado de clientes</h2>";

    tabla += "<table class='table table-striped' id='listadoPorCliente'>";
    tabla += "<thead><tr><th>ID</th><th>NOMBRE</th><th>EMAIL</th><th>TELEFONO</th><th colspan='2'>ACCION</th></tr></thead><tbody>";

    for (let cliente of respuesta.datos) {
        tabla += "<tr><td>" + cliente.idcliente + "</td>";
        tabla += "<td>" + cliente.nombre + "</td>";
        tabla += "<td>" + cliente.email + "</td>";
        tabla += "<td>" + cliente.telefono + "</td>";

        tabla += "<td><button class='btn btn-primary modificarCliente' data-cliente='" + JSON.stringify(cliente) + "'><i class='bi bi-pencil-square'></i></button><button class='btn btn-danger ms-3 eliminarCliente' data-cliente='" + JSON.stringify(cliente) + "'><i class='bi bi-trash'></i></button></td></tr>";
    }

    tabla += "</tbody></table>";

    // Agregamos el contenido a la capa de listados
    document.querySelector("#listadoCliente").innerHTML = tabla;
    // Agregar manejador de evento para toda la tabla
    document.querySelector("#listadoPorCliente").addEventListener("click", procesarBotonEditarCliente)

}

function procesarBotonEditarCliente(oEvento) {

    let boton = null;

    // Verificamos si han hecho clic sobre el botón o el icono
    if (oEvento.target.nodeName == "I" || oEvento.target.nodeName == "button") {
        if (oEvento.target.nodeName == "I") {
            // Pulsacion sobre el icono
            boton = oEvento.target.parentElement; // El padre es el boton
        } else {
            boton = oEvento.target;
        }

        let cliente = JSON.parse(boton.dataset.cliente);

        if (boton.classList.contains("modificarCliente")) {
            frmModCliente.style.display = "block";

            frmModCliente.ModClienteId.value = cliente.idcliente;
            frmModCliente.ModClienteNombre.value = cliente.nombre;
            frmModCliente.ModClienteEmail.value = cliente.email;
            frmModCliente.ModClienteTelefono.value = cliente.telefono;

        } else if (boton.classList.contains("eliminarCliente")) {
            borrarCliente(cliente);
        }
    }
}

async function procesarModificarCliente() {

    let idcliente = parseInt(frmModCliente.ModClienteID.value); //Trim o no?
    let nombre = frmModCliente.ModClienteNombre.value.trim();
    let email = frmModCliente.ModClienteEmail.value;
    let telefono = parseInt(frmModCliente.ModClienteTelefono.value);

    // Validar datos del formulario
    if (validarModificarCliente()) {
        let cliente = new Cliente(idcliente, nombre, email, telefono);

        let respuesta = await oRestaurante.modificarCliente(cliente);

        alert(respuesta.mensaje);

        if (!respuesta.error) { // Si NO hay error
            //Resetear formulario
            frmModCliente.reset();
            // Ocultar el formulario
            frmModCliente.style.display = "none";
        }

    }

}

function validarModificarCliente() {

    //No se que hacer aqui tampoco

    return valido;
}

async function borrarCliente(oEvento) {

    let respuesta = await oRestaurante.borrarCliente(oEvento.idcliente);

    alert(respuesta.mensaje);

    if (!respuesta.error) { // Si NO hay error
        // Borrado de la tabla html
        document.querySelector("#listadoCliente").addEventListener("load", location.reload());
    }

}

async function procesarBuscarCliente() {
    let nombreCliente = parseFloat(frmBuscarCliente.buscarClienteNombre.value.trim()); //Trim o no?

    let respuesta = await oRestaurante.buscarCliente(precioCliente);

    if (!respuesta.error) { // Si NO hay error
        let resultadoBusqueda = document.querySelector("#resultadoBusquedaCliente");

        // Escribimos resultado
        let tablaSalida = "<table class='table'>";
        tablaSalida += "<thead><tr><th>IDCLIENTE</th><th>NOMBRE</th><th>EMAIL</th><th>TELEFONO</th></tr></thead>";
        tablaSalida += "<tbody><tr>";
        tablaSalida += "<td>" + respuesta.datos.idcliente + "</td>"
        tablaSalida += "<td>" + respuesta.datos.nombre + "</td>"
        tablaSalida += "<td>" + respuesta.datos.email + "</td>"
        tablaSalida += "<td>" + respuesta.datos.telefono + "</td>"
        tablaSalida += "</tr></tbody></table>";

        resultadoBusqueda.innerHTML = tablaSalida;
        resultadoBusqueda.style.display = 'block';

        frmBuscarCliente.reset();

    } else { // Si hay error
        alert(respuesta.mensaje);
    }
}

// Parte de Menu
async function procesarAltaMenu() {
    let nombre = frmAltaMenu.txtNombrePlato.value.trim();
    let descripcion = frmAltaMenu.txtDescripcion.value.trim();   
    let precio = parseFloat(frmAltaMenu.txtPrecio.value.trim());
    let alergenos = frmAltaMenu.selectAlergenos.value.trim();
    
    if (validarAltaMenu()) {
        console.log(oRestaurante);
        let respuesta = await oRestaurante.altaMenu(new Menu(null, nombre, descripcion, precio, alergenos));
        console.log(respuesta);
        alert(respuesta.mensaje);
        if (respuesta.ok) {
            frmAltaMenu.reset();
            ocultarFormularios();
        }
    }

}

function validarAltaMenu() {

    let nombre = frmAltaMenu.txtNombrePlato.value.trim();
    let descripcion = frmAltaMenu.txtDescripcion.value.trim();   
    let precio = parseFloat(frmAltaMenu.txtPrecio.value.trim());
    let errores = "";
    let valido = true;

    if (nombre.length == 0){
        errores+= "Se requiere rellenar el nombre\n";
        valido = false;
        frmAltaMenu.txtNombrePlato.classList.add("error")
    
    } else{
        frmAltaMenu.txtNombrePlato.classList.remove("error")
        
    }

    if (descripcion.length == 0){
        errores+= "Se requiere rellenar la descripcion del plato\n";
        valido = false;
        frmAltaMenu.txtDescripcion.classList.add("error")
    
    } else{
        frmAltaMenu.txtDescripcion.classList.remove("error")
        
    }

    if (isNaN(precio)){
        errores+= "El precio debe ser un numero\n";
        valido = false;
        frmAltaMenu.txtPrecio.classList.add("error")
    
    } else{
        frmAltaMenu.txtPrecio.classList.remove("error")
        
    }

    if (!valido) {
        alert(errores);
    }

    return valido;
}


async function procesarListadoMenu() {
    // Solicitar datos del menú al backend
    let respuesta = await oRestaurante.listadoMenu();

    if (respuesta.ok) {
        let tabla = "<h2>Listado de Menú</h2>";
        tabla += "<table class='table table-striped'>";
        tabla += "<thead><tr><th>ID Plato</th><th>Nombre</th><th>Descripción</th><th>Precio</th><th>Alérgenos</th></tr></thead><tbody>";

        for (let plato of respuesta.datos) {
            tabla += "<tr>";
            tabla += `<td>${plato.idplato}</td>`;
            tabla += `<td>${plato.nombre}</td>`;
            tabla += `<td>${plato.descripcion}</td>`;
            tabla += `<td>${plato.precio}</td>`;
            tabla += `<td>${plato.alergenos}</td>`;
            tabla += "</tr>";
        }

        tabla += "</tbody></table>";

        // Insertar la tabla en el formulario
        frmListadoMenu.innerHTML = tabla;
    } else {
        // Mostrar mensaje de error si la solicitud falla
        frmListadoMenu.innerHTML = `
            <div class="alert alert-danger">Error al cargar el menú: ${respuesta.mensaje}</div>
        `;
    }
}

  //A PARTIR DE AQUI TERMINA LA PARTE DE CLIENTES
async function procesarListadoPedidos(){
    let nombreCliente = frmListadoPedidosCliente.txtNombreClienteListado.value.trim();

    const listado = await oBar.listadoPedidoCliente(nombreCliente);

    document.querySelector("#listado").innerHTML = listado;
    document.querySelector("#listado").classList.remove("d-none");

}

async function procesarAltaPedido(){
    let nombre = frmAltaPedido.txtNombreCliente.value.trim();
    let idplato = frmAltaPedido.lstPlatos.value;
    let unidades = frmAltaPedido.rbtUnidades.value;

    const pedido = new Pedido(null, nombre, idplato, unidades);

    const respuesta = await oBar.altaPedido(pedido);

    alert(respuesta.mensaje);

    if(respuesta.ok){
        frmAltaPedido.reset();
        ocultarFormularios();
    }

}




async function cargarDesplegable(){
    const respuesta = await oRestaurante.getPlatos();

    if(respuesta.ok){
        let optionsPlatos = "";
        for(let plato of respuesta.datos){
            optionsPlatos += `<option value="${plato.idplato}">${plato.nombre}</option>`;
        }

        frmAltaPedido.lstPlatos.innerHTML  = optionsPlatos;
    } else{
        alert("Error al recuperar los platos");
    }
}

