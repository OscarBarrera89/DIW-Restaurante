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
    document.querySelector("#mnuListadoMenuPorNombre").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuBuscarMenu").addEventListener("click", mostrarFormulario);
    frmAltaMenu.btnAceptarAltaMenu.addEventListener("click", procesarAltaMenu);
    frmListadoMenuPorNombre.btnBuscarNombrePLato.addEventListener("click", buscarPlatoPorNombre);
    frmParametrizado.btnBuscarParametrizado.addEventListener("click", buscarParametrizado);
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
            procesarListadoMenu();
            break;
        case "mnuListadoMenuPorNombre":
            frmListadoMenuPorNombre.style.display = "block";
            break;
        case "mnuBuscarMenu":
            frmParametrizado.style.display = "block";

        default:
            break;
    }
}

function ocultarFormularios(){
    frmAltaCliente.style.display = "none";
    frmAltaMenu.style.display = "none";
    frmListadoMenu.style.display = "none";
    frmListadoMenuPorNombre.style.display = "none";
    frmParametrizado.style.display = "none";
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
 //A PARTIR DE AQUI TERMINA LA PARTE DE CLIENTES

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
        tabla += "<thead><tr><th>ID Plato</th><th>Nombre</th><th>Descripción</th><th>Precio</th><th>Alérgenos</th><th>Eliminar</th><th>Editar</th></tr></thead><tbody>";

        for (let plato of respuesta.datos) {
            tabla += "<tr>";
            tabla += `<td>${plato.idplato}</td>`;
            tabla += `<td>${plato.nombre}</td>`;
            tabla += `<td>${plato.descripcion}</td>`;
            tabla += `<td>${plato.precio}</td>`;
            tabla += `<td>${plato.alergenos}</td>`;
            tabla += `<td><button class="btn btn-danger btn-sm" onclick="eliminarMenu(${plato.idplato})">Eliminar</button></td>`;
            tabla += `<td><button class="btn btn-primary btn-sm" onclick="mostrarFormularioEdicion(${plato.idplato}, '${plato.nombre}', '${plato.descripcion}', ${plato.precio}, '${plato.alergenos}')">Editar</button></td>`;
            tabla += "</tr>";
        }

        tabla += "</tbody></table>";

        // Insertar la tabla en el contenedor correcto
        document.querySelector("#listadoMenu").innerHTML = tabla;

        // Asegúrate de que el formulario de edición está oculto inicialmente
    } else {
        // Mostrar mensaje de error si la solicitud falla
        document.querySelector("#listadoMenu").innerHTML = `
            <div class="alert alert-danger">Error al cargar el menú: ${respuesta.mensaje}</div>
        `;
    }
}

// Función para mostrar el formulario de edición
function mostrarFormularioEdicion(idplato, nombre, descripcion, precio, alergenos) {
    const formulario = `
        <h3>Editar Plato</h3>
        <form id="formEditarPlato">
            <div class="mb-3">
                <label for="editNombre" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="editNombre" value="${nombre}">
            </div>
            <div class="mb-3">
                <label for="editDescripcion" class="form-label">Descripción</label>
                <input type="text" class="form-control" id="editDescripcion" value="${descripcion}">
            </div>
            <div class="mb-3">
                <label for="editPrecio" class="form-label">Precio</label>
                <input type="number" step="0.01" class="form-control" id="editPrecio" value="${precio}">
            </div>
            <div class="mb-3">
                <label for="editAlergenos">Alérgenos:</label>
						<select id="editAlergenos" name="editAlergenos" class="form-select" multiple>
							<option value="gluten">Gluten</option>
							<option value="crustaceos">Crustáceos</option>
							<option value="huevos">Huevos</option>
							<option value="pescado">Pescado</option>
							<option value="cacahuetes">Cacahuetes</option>
							<option value="soja">Soja</option>
							<option value="lacteos">Leche y derivados (incluyendo lactosa)</option>
							<option value="frutos_cascara">Frutos de cáscara (almendras, avellanas, nueces, etc.)</option>
							<option value="apio">Apio</option>
							<option value="mostaza">Mostaza</option>
							<option value="sesamo">Sésamo</option>
							<option value="sulfitos">Sulfitos</option>
							<option value="altramuces">Altramuces</option>
							<option value="moluscos">Moluscos</option>
						</select>
						<small class="form-text text-muted">Mantén presionada la tecla <strong>Ctrl</strong> (Cmd en Mac) para seleccionar múltiples alérgenos.</small>
            </div>
            <button type="button" class="btn btn-success" onclick="guardarCambiosPlato(${idplato})">Guardar Cambios</button>
        </form>
    `;
    document.querySelector("#formularioEdicion").innerHTML = formulario;    

}

// Función para guardar los cambios del plato
async function guardarCambiosPlato(idplato) {
    const nombre = document.querySelector("#editNombre").value.trim();
    const descripcion = document.querySelector("#editDescripcion").value.trim();
    const precio = parseFloat(document.querySelector("#editPrecio").value.trim());
    const alergenos = document.querySelector("#editAlergenos").value.trim();

    // Validar los datos
    const errores = validarDatosPlato(nombre, descripcion, precio, alergenos);
    if (errores.length > 0) {
        alert(`Errores encontrados:\n${errores.join("\n")}`);
        return; // Salir si hay errores
    }

    const platoActualizado = new Menu(idplato, nombre, descripcion, precio, alergenos);

    const respuesta = await oRestaurante.modificarMenu(platoActualizado);

    if (!respuesta.ok) {
        alert("Plato actualizado correctamente.");
        // Recargar el listado del menú
        procesarListadoMenu();
    } else {
        alert(`Error al actualizar el plato: ${respuesta.mensaje}`);
    }
}

async function buscarPlatoPorNombre() {
    let nombrePlato = frmListadoMenuPorNombre.txtBusquedaPlato.value.trim(); //Trim o no?

    let respuesta = await oRestaurante.buscarMenu(nombrePlato);

    if (!respuesta.error) { // Si NO hay error
        let resultadoBusqueda = document.querySelector("#resultadoBusquedaPlato");
        resultadoBusqueda.style.display = 'none';
        // Escribimos resultado
        let tablaSalida = "<table class='table'>";
        tablaSalida += "<thead><tr><th>ID</th><th>Nombre</th><th>Descripcion</th><th>Precio</th><th>Alergenos</th></tr></thead>";
        tablaSalida += "<tbody><tr>";
        tablaSalida += "<td>" + respuesta.datos.idplato + "</td>"
        tablaSalida += "<td>" + respuesta.datos.nombre + "</td>"
        tablaSalida += "<td>" + respuesta.datos.descripcion + "</td>"
        tablaSalida += "<td>" + respuesta.datos.precio + "</td>"
        tablaSalida += "<td>" + respuesta.datos.alergenos + "</td>"
        tablaSalida += "</tr></tbody></table>";

        resultadoBusqueda.innerHTML = tablaSalida;
        resultadoBusqueda.style.display = 'block';

    } else { // Si hay error
        alert(respuesta.mensaje);
    }
}

// Función para validar los datos del plato
function validarDatosPlato(nombre, descripcion, precio, alergenos) {
    const errores = [];

    if (!nombre) {
        errores.push("El nombre no puede estar vacío.");
    }

    if (!descripcion) {
        errores.push("La descripción no puede estar vacía.");
    }

    if (isNaN(precio) || precio <= 0) {
        errores.push("El precio debe ser un número mayor que 0.");
    }

    if (!alergenos) {
        errores.push("Los alérgenos no pueden estar vacíos.");
    }

    return errores; // Retorna un array con los mensajes de error
}



// Función para eliminar un plato del menú
async function eliminarMenu(idPlato) {
    if (confirm("¿Estás seguro de que deseas eliminar este plato?")) {
        let respuesta = await oRestaurante.eliminarPlato(idPlato);
        if (!respuesta.ok) {
            alert("Plato eliminado exitosamente.");
            // Recargar la lista del menú
            procesarListadoMenu();
        } else {
            alert(`Error al eliminar el plato: ${respuesta.mensaje}`);
        }
    }
}

async function buscarParametrizado(){
    let nombre = frmParametrizado.txtNombrePlato1.value.trim();
    let descripcion = frmParametrizado.txtDescripcion1.value.trim();   
    let precio = parseFloat(frmParametrizado.txtPrecio1.value.trim());
    let alergenos = frmParametrizado.selectAlergenos1.value.trim();

    // Validar los datos
    const errores = validarDatosPlato(nombre, descripcion, precio, alergenos);
    if (errores.length > 0) {
        alert(`Errores encontrados:\n${errores.join("\n")}`);
        return; // Salir si hay errores
    }

    let respuesta = await oRestaurante.BuscarMenuParam(nombre, descripcion, precio, alergenos);

    if (!respuesta.error) { // Si NO hay error
        let resultadoBusqueda = document.querySelector("#resultadoBusquedaPlato2");
        resultadoBusqueda.style.display = 'none';
        // Escribimos resultado
        let tablaSalida = "<table class='table'>";
        tablaSalida += "<thead><tr><th>ID</th><th>Nombre</th><th>Descripcion</th><th>Precio</th><th>Alergenos</th></tr></thead>";
        tablaSalida += "<tbody><tr>";
        tablaSalida += "<td>" + respuesta.datos.idplato + "</td>"
        tablaSalida += "<td>" + respuesta.datos.nombre + "</td>"
        tablaSalida += "<td>" + respuesta.datos.descripcion + "</td>"
        tablaSalida += "<td>" + respuesta.datos.precio + "</td>"
        tablaSalida += "<td>" + respuesta.datos.alergenos + "</td>"
        tablaSalida += "</tr></tbody></table>";

        resultadoBusqueda.innerHTML = tablaSalida;
        resultadoBusqueda.style.display = 'block';

    } else { // Si hay error
        alert(respuesta.mensaje);
    }
}


  //A PARTIR DE AQUI TERMINA LA PARTE DE MENU
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

