"use strict";

// Codificar aquí el programa principal
var oRestaurante = new Restaurante();

registrarEventos();

function registrarEventos() {
    ocultarFormularios();

    //Parte de Cliente
    document.querySelector("#mnuAltaCliente").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuListadoCliente").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuListadoClientePorNombre").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuBuscarCliente").addEventListener("click", mostrarFormulario);
    frmAltaCliente.btnAceptarAltaCliente.addEventListener("click", procesarAltaCliente);
    frmListadoClientePorNombre.btnBuscarNombreCliente.addEventListener("click", buscarClientePorNombre);
    frmParametrizadoCliente.btnBuscarParametrizadoCliente.addEventListener("click", buscarParametrizadoCliente);
    frmModificarCliente.btnAceptarModificarCliente.addEventListener("click", procesarModificarCliente);

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

    //Parte de Pedido
    document.querySelector("#mnuAltaPedido").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuListadoPedidos").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuListadoPedidosPorCamarero").addEventListener("click", mostrarFormulario);
    /*document.querySelector("#mnuBuscarPedido").addEventListener("click", mostrarFormulario);*/
    frmAltaPedido.btnAceptarAltaPedido.addEventListener("click", procesarAltaPedido);
    frmListadoPedidosPorCamarero.btnBuscarNombreCamarero.addEventListener("click", buscarPedidoPorCamarero);
    /*frmParametrizadoPedido.btnBuscarParametrizado.addEventListener("click", buscarParametrizadoPedido);*/
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
        case "mnuListadoClientePorNombre":
            frmListadoClientePorNombre.style.display = "block";
            break;
        case "mnuBuscarCliente":
            frmParametrizadoCliente.style.display = "block";
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
            break;
        //Pedido
        case "mnuAltaPedido":
            frmAltaPedido.style.display = "block";
            cargarDesplegable();
            break;
        case "mnuListadoPedidos":
            frmListadoPedidos.style.display = "block";
            procesarListadoPedidos();
            break;
        case "mnuListadoPedidosPorCamarero":
            frmListadoPedidosPorCamarero.style.display = "block";
            break;
        case "mnuBuscarPedido":
            frmParametrizadoPedido.style.display = "block";
            break;
        default:
            break;
    }
}

function ocultarFormularios(){
    frmAltaCliente.style.display = "none";
    frmListadoClientePorNombre.style.display = "none";
    frmParametrizadoCliente.style.display = "none";
    frmModificarCliente.style.display = "none";
    listadoCliente.style.display = "none";
    frmAltaMenu.style.display = "none";
    frmListadoMenu.style.display = "none";
    frmListadoMenuPorNombre.style.display = "none";
    frmParametrizado.style.display = "none";
    //Pedidos
    frmAltaPedido.style.display = "none";
    frmListadoPedidos.style.display = "none";
    frmListadoPedidosPorCamarero.style.display = "none";
    // frmParametrizadoPedido.style.display = "none";
}

//PARTE CLIENTE

async function procesarAltaCliente() {
    let nombre = frmAltaCliente.txtNombre.value.trim();
    let email = frmAltaCliente.txtEmail.value.trim();   
    let telefono = parseInt(frmAltaCliente.txtNumero.value.trim());
    
    if (validarAltaCliente()) {
        console.log(oRestaurante);
        let respuesta = await oRestaurante.altaCliente(new Cliente(null, nombre, email, telefono));
        console.log(respuesta)
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
    // Solicitar datos del menú al backend
    let respuesta = await oRestaurante.listadoCliente();

   // if (respuesta.ok) {
        let tabla = "<h2>Listado de Clientes</h2>";
        tabla += "<table class='table table-striped' id = 'listadoPorCliente'>";
        tabla += "<thead><tr><th>ID Plato</th><th>Nombre</th><th>Email</th><th>Telefono</th><th>Eliminar</th><th>Editar</th></tr></thead><tbody>";

        for (let cliente of respuesta.datos) {
            tabla += "<tr>";
            tabla += `<td>${cliente.idcliente}</td>`;
            tabla += `<td>${cliente.nombre}</td>`;
            tabla += `<td>${cliente.email}</td>`;
            tabla += `<td>${cliente.telefono}</td>`;
            tabla += "<td><button class='btn btn-danger ms-3 eliminarCliente' data-cliente='" + JSON.stringify(cliente) + "'><i class='bi bi-trash'></i></button></td>'";
            tabla += "<td><button class='btn btn-primary modificarCliente' data-cliente='" + JSON.stringify(cliente) + "'><i class='bi bi-pencil-square'></i></button></td>'";
            tabla += "</tr>";
        }

        tabla += "</tbody></table>";

        // Insertar la tabla en el contenedor correcto
        document.querySelector("#listadoCliente").innerHTML = tabla;
        document.querySelector("#listadoPorCliente").addEventListener('click', procesarBotonEditarCliente);

        // Asegúrate de que el formulario de edición está oculto inicialmente
    // } else {
    //     // Mostrar mensaje de error si la solicitud falla
    //     document.querySelector("#listadoCliente").innerHTML = `
    //         <div class="alert alert-danger">Error al cargar el cliente: ${respuesta.mensaje}</div>
    //     `;
    //}
}

// Función para mostrar el formulario de edición
function mostrarFormularioEdicionCliente(idcliente, nombre, email, telefono) {
    const formulario = `
        <h3>Editar Cliente</h3>
        <form id="formEditarCliente">
            <div class="mb-3">
                <label for="editCliente" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="editNombreCliente" value="${nombre}">
            </div>
            <div class="mb-3">
                <label for="editEmail" class="form-label">Email</label>
                <input type="text" class="form-control" id="editEmail" value="${email}">
            </div>
            <div class="mb-3">
                <label for="editTelefono" class="form-label">Telefono</label>
                <input type="number" class="form-control" id="editTelefono" value="${telefono}">
            </div>
            <button type="button" class="btn btn-success" onclick="guardarCambiosCliente(${idcliente})">Guardar Cambios</button>
        </form>
    `;
    document.querySelector("#formularioEdicionCliente").innerHTML = formulario;    

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
            frmModificarCliente.style.display = "block";

            frmModificarCliente.txtModificarId.value = cliente.idcliente;
            frmModificarCliente.txtModificarNombre.value = cliente.nombre;
            frmModificarCliente.txtModificarEmail.value = cliente.email;
            frmModificarCliente.txtModificarNumero.value = cliente.telefono;
    

        } else if (boton.classList.contains("eliminarCliente")) {
            borrarCliente(cliente);
        }
    }
}

async function borrarCliente(oEvento) {

    let respuesta = await oRestaurante.borrarCliente(oEvento.idcliente);

    alert(respuesta.mensaje);

    if (!respuesta.error) { // Si NO hay error
        // Borrado de la tabla html
        document.querySelector("#listadoCliente").addEventListener("load", location.reload());
    }

}

async function procesarModificarCliente() {

    let idcliente = parseInt(frmModificarCliente.txtModificarId.value);
    let nombre = frmModificarCliente.txtModificarNombre.value.trim();
    let email = frmModificarCliente.txtModificarEmail.value.trim();
    let telefono = parseInt(frmModificarCliente.txtModificarNumero.value);


    // Validar datos del formulario
    
        let cliente = new Cliente(idcliente, nombre, email, telefono);

        let respuesta = await oRestaurante.modificarCliente(cliente);

        alert(respuesta.mensaje);

        if (!respuesta.error) { // Si NO hay error
            //Resetear formulario
            frmModificarCliente.reset();
            // Ocultar el formulario
            frmModificarCliente.style.display = "none";
        }

}


// Función para guardar los cambios del cliente
async function guardarCambiosCliente(idcliente) {
    const nombre = document.querySelector("#editNombre").value.trim();
    const email = document.querySelector("#editEmail").value.trim();
    const telefono = parseFloat(document.querySelector("#editTelefono").value.trim());

    // Validar los datos
    const errores = validarDatosPlato(nombre, email, telefono);
    if (errores.length > 0) {
        alert(`Errores encontrados:\n${errores.join("\n")}`);
        return; // Salir si hay errores
    }

    const clienteActualizado = new Cliente(idcliente, nombre, email, telefono);

    const respuesta = await oRestaurante.modificarCliente(clienteActualizado);

    if (!respuesta.ok) {
        alert("Cliente actualizado correctamente.");
        // Recargar el listado del menú
        procesarListadoCliente();
    } else {
        alert(`Error al actualizar el cliente: ${respuesta.mensaje}`);
    }
}

async function buscarClientePorNombre() {
    let nombreCliente = frmListadoClientePorNombre.txtBusquedaCliente.value.trim(); //Trim o no?

    let respuesta = await oRestaurante.buscarCliente(nombreCliente);

    if (!respuesta.error) { // Si NO hay error
        let resultadoBusqueda = document.querySelector("#resultadoBusquedaCliente");
        resultadoBusqueda.style.display = 'none';
        // Escribimos resultado
        let tablaSalida = "<table class='table'>";
        tablaSalida += "<thead><tr><th>ID</th><th>Nombre</th><th>Email</th><th>Telefono</th></tr></thead>";
        tablaSalida += "<tbody><tr>";
        tablaSalida += "<td>" + respuesta.datos.idcliente + "</td>"
        tablaSalida += "<td>" + respuesta.datos.nombre + "</td>"
        tablaSalida += "<td>" + respuesta.datos.email + "</td>"
        tablaSalida += "<td>" + respuesta.datos.telefono + "</td>"
        tablaSalida += "</tr></tbody></table>";

        resultadoBusqueda.innerHTML = tablaSalida;
        resultadoBusqueda.style.display = 'block';

    } else { // Si hay error
        alert(respuesta.mensaje);
    }
}

// Función para validar los datos del cliente
function validarDatosCliente(nombre, email, telefono) {
    const errores = [];

    if (!nombre) {
        errores.push("El nombre no puede estar vacío.");
    }

    if (!email) {
        errores.push("El email no puede estar vacío.");
    }

    if (isNaN(telefono)) {
        errores.push("El telefono debe ser un número.");
    }

    return errores; // Retorna un array con los mensajes de error
}

// Función para eliminar un plato del menú
async function eliminarCliente(idCliente) {
    if (confirm("¿Estás seguro de que deseas eliminar este cliente?")) {
        let respuesta = await oRestaurante.eliminarCliente(idCliente);
        if (!respuesta.ok) {
            alert("Cliente eliminado exitosamente.");
            // Recargar la lista del menú
            procesarListadoCliente();
        } else {
            alert(`Error al eliminar el cliente: ${respuesta.mensaje}`);
        }
    }
}

async function buscarParametrizadoCliente(){
    let nombre = frmParametrizadoCliente.txtNombreCliente.value.trim();
    let email = frmParametrizadoCliente.txtEmailCliente.value.trim();   
    let telefono = parseInt(frmParametrizadoCliente.txtTelefonoCliente.value.trim());
    

    // Validar los datos
    const errores = validarDatosCliente(nombre, email, telefono);
    // if (errores.length > 0) {
    //     alert(`Errores encontrados:\n${errores.join("\n")}`);
    //     return; // Salir si hay errores
    // }

    let respuesta = await oRestaurante.BuscarClienteParam(nombre, email, telefono);

    if (!respuesta.error) { // Si NO hay error
        let resultadoBusqueda = document.querySelector("#resultadoBusquedaCliente2");
        resultadoBusqueda.style.display = 'none';
        console.log(respuesta);
        // Escribimos resultado
        let tablaSalida = "<table class='table'>";
        tablaSalida += "<thead><tr><th>ID</th><th>Nombre</th><th>Email</th><th>Telefono</th></tr></thead>";
        tablaSalida += "<tbody><tr>";
        tablaSalida += "<td>" + respuesta.datos.idcliente + "</td>"
        tablaSalida += "<td>" + respuesta.datos.nombre + "</td>"
        tablaSalida += "<td>" + respuesta.datos.email + "</td>"
        tablaSalida += "<td>" + respuesta.datos.telefono + "</td>"
        tablaSalida += "</tr></tbody></table>";

        resultadoBusqueda.innerHTML = tablaSalida;
        resultadoBusqueda.style.display = 'block';

    } else { // Si hay error
        alert(respuesta.mensaje);
    }
}

 //TERMINA LA PARTE DE CLIENTES

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
    document.querySelector("#formularioEdicion2").innerHTML = formulario;    

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
        tablaSalida += "<thead><tr><th>ID</th><th>Nombre</th><th>Descripcion</th><th>Precio</th><th>Alergenos</th><th>Eliminar</th><th>Editar</th></tr></thead>";
        tablaSalida += "<tbody><tr>";
        tablaSalida += "<td>" + respuesta.datos.idplato + "</td>"
        tablaSalida += "<td>" + respuesta.datos.nombre + "</td>"
        tablaSalida += "<td>" + respuesta.datos.descripcion + "</td>"
        tablaSalida += "<td>" + respuesta.datos.precio + "</td>"
        tablaSalida += "<td>" + respuesta.datos.alergenos + "</td>"
        tablaSalida += "<td><button class='btn btn-danger btn-sm' onclick='eliminarMenu(" + respuesta.datos.idplato +")'>Eliminar</button></td>";
        tablaSalida += "<td><button class='btn btn-primary btn-sm' onclick='mostrarFormularioEdicion(" 
        + respuesta.datos.idplato + ", " 
        + "\"" + respuesta.datos.nombre.replace(/"/g, '&quot;') + "\"" + ", " 
        + "\"" + respuesta.datos.descripcion.replace(/"/g, '&quot;') + "\"" + ", " 
        + respuesta.datos.precio + ", "
        + "\"" + respuesta.datos.alergenos.replace(/"/g, '&quot;') + "\"" 
        + ")'>Editar</button></td>";
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

async function buscarParametrizado() {
    let nombre = frmParametrizado.txtNombrePlato1.value.trim();
    let descripcion = frmParametrizado.txtDescripcion1.value.trim();
    let alergenos = frmParametrizado.selectAlergenos1.value.trim();

    const errores = validarDatosPlatoParam(nombre, descripcion, alergenos);
    if (errores.length > 0) {
        alert(`Errores encontrados:\n${errores.join("\n")}`);
        return;
    }

    let respuesta = await oRestaurante.BuscarMenuParam(nombre, descripcion, alergenos);
    console.log(respuesta);

    if (!respuesta.error && Array.isArray(respuesta.datos)) {
        let resultadoBusqueda = document.querySelector("#resultadoBusquedaPlato2");
        resultadoBusqueda.style.display = 'none';

        let tablaSalida = "<table class='table'>";
        tablaSalida += "<thead><tr><th>ID</th><th>Nombre</th><th>Descripcion</th><th>Precio</th><th>Alergenos</th></tr></thead>";
        tablaSalida += "<tbody>";

        respuesta.datos.forEach(plato => {
            tablaSalida += "<tr>";
            tablaSalida += `<td>${plato.idplato}</td>`;
            tablaSalida += `<td>${plato.nombre}</td>`;
            tablaSalida += `<td>${plato.descripcion}</td>`;
            tablaSalida += `<td>${plato.precio}</td>`;
            tablaSalida += `<td>${plato.alergenos}</td>`;
            tablaSalida += "</tr>";
        });

        tablaSalida += "</tbody></table>";

        resultadoBusqueda.innerHTML = tablaSalida;
        resultadoBusqueda.style.display = 'block';
    } else {
        alert(respuesta.mensaje || "No se encontraron resultados.");
    }
}


async function validarDatosPlatoParam(nombre, descripcion, alergenos){
    const errores = [];

    if (!nombre) {
        errores.push("El nombre no puede estar vacío.");
    }

    if (!descripcion) {
        errores.push("La descripción no puede estar vacía.");
    }

    if (!alergenos) {
        errores.push("Los alérgenos no pueden estar vacíos.");
    }

    return errores; // Retorna un array con los mensajes de error
}
  //A PARTIR DE AQUI TERMINA LA PARTE DE MENU





//Parte de Pedidos
async function procesarAltaPedido(){
    let idcliente = frmAltaPedido.lstCliente.value.trim();
    let fecha = frmAltaPedido.txtFecha.value.trim();
    let camarero = frmAltaPedido.txtCamarero.value.trim();
    let total = parseFloat(frmAltaPedido.txtTotal.value.trim());

    const pedido = new Pedido(null, idcliente, fecha, camarero, total);

    const respuesta = await oRestaurante.altaPedido(pedido);

    alert(respuesta.mensaje);

    if(respuesta.ok){
        frmAltaPedido.reset();
        ocultarFormularios();
    }

}

async function procesarListadoPedidos() {
    // Solicitar datos del pedido al backend
    let respuesta = await oRestaurante.listadoPedido();

    if (respuesta.ok) {
        let tabla = "<h2>Listado de Pedidos</h2>";
        tabla += "<table class='table table-striped'>";
        tabla += "<thead><tr><th>ID Pedido</th><th>ID Cliente</th><th>Fecha</th><th>Camarero</th><th>Total</th><th>Eliminar</th><th>Editar</th></tr></thead><tbody>";

        for (let pedido of respuesta.datos) {
            tabla += "<tr>";
            tabla += `<td>${pedido.idpedido}</td>`;
            tabla += `<td>${pedido.idcliente}</td>`;
            tabla += `<td>${pedido.fecha}</td>`;
            tabla += `<td>${pedido.camarero}</td>`;
            tabla += `<td>${pedido.total}</td>`;
            tabla += `<td><button class="btn btn-danger btn-sm" onclick="eliminarPedido(${pedido.idpedido})">Eliminar</button></td>`;
            tabla += `<td><button class="btn btn-primary btn-sm" onclick="mostrarFormularioEdicion(${pedido.idpedido}, '${pedido.idcliente}', '${pedido.fecha}', ${pedido.camarero}, '${pedido.total}')">Editar</button></td>`;
            tabla += "</tr>";
        }

        tabla += "</tbody></table>";

        // Insertar la tabla en el contenedor correcto
        document.querySelector("#listadoPedido").innerHTML = tabla;

        // Asegúrate de que el formulario de edición está oculto inicialmente
    } else {
        // Mostrar mensaje de error si la solicitud falla
        document.querySelector("#listadoPedido").innerHTML = `
            <div class="alert alert-danger">Error al cargar el pedido: ${respuesta.mensaje}</div>
        `;
    }
}

async function eliminarPedido(idpedido) {
    if (confirm("¿Estás seguro de que deseas eliminar este pedido?")) {
        let respuesta = await oRestaurante.eliminarPedido(idpedido);
        if (!respuesta.ok) {
            alert("Pedido eliminado exitosamente.");
            // Recargar la lista del menú
            procesarListadoMenu();
        } else {
            alert(`Error al eliminar el pedidos: ${respuesta.mensaje}`);
        }
    }
}


async function cargarDesplegable(){
    const respuesta = await oRestaurante.listadoCliente();

    if(respuesta.ok){
        let optionsCliente = "";
        for(let cliente of respuesta.datos){
            optionsCliente += `<option value="${cliente.idcliente}">${cliente.nombre}</option>`;
        }

        frmAltaPedido.lstCliente.innerHTML  = optionsCliente;
    } else{
        alert("Error al recuperar los clientes");
    }
}

/*
function mostrarFormularioEdicionPedido(idpedido, idcliente, fecha, camarero, total) {
    const formulario = `
        <h3>Editar Pedido</h3>
        <form id="formEditarPedido">
            <div class="mb-3">
                <label for="editIdpedido" class="form-label">ID Pedido</label>
                <input type="text" class="form-control" id="editIdpedido" value="${idpedido}">
            </div>
            <div class="mb-3">
                <label for="editIdcliente" class="form-label">ID Cliente</label>
                <input type="text" class="form-control" id="editIdcliente" value="${idcliente}">
            </div>
            <div class="mb-3">
                <label for="editFecha" class="form-label">Fecha</label>
                <input type="number" step="0.01" class="form-control" id="editFecha" value="${fecha}">
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
    document.querySelector("#formularioEdicion2").innerHTML = formulario;    

}

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
}*/

async function buscarPedidoPorCamarero() {
    let nombrePedido = frmListadoPedidosPorCamarero.txtBusquedaCamarero.value.trim(); //Trim o no?

    let respuesta = await oRestaurante.buscarPedido(nombrePedido);

    if (!respuesta.error) { // Si NO hay error
        let resultadoBusqueda = document.querySelector("#resultadoBusquedaCamarero");
        resultadoBusqueda.style.display = 'none';
        // Escribimos resultado
        let tablaSalida = "<table class='table'>";
        tablaSalida += "<thead><tr><th>ID Pedido</th><th>ID Cliente</th><th>Fecha</th><th>Camarero</th><th>Total</th><th>Eliminar</th><th>Editar</th></tr></thead>";
        tablaSalida += "<tbody><tr>";
        tablaSalida += "<td>" + respuesta.datos.idpedido + "</td>"
        tablaSalida += "<td>" + respuesta.datos.idcliente + "</td>"
        tablaSalida += "<td>" + respuesta.datos.fecha + "</td>"
        tablaSalida += "<td>" + respuesta.datos.camarero + "</td>"
        tablaSalida += "<td>" + respuesta.datos.total + "</td>"
        tablaSalida += "<td><button class='btn btn-danger btn-sm' onclick='eliminarMenu(" + respuesta.datos.idpedido +")'>Eliminar</button></td>";
        tablaSalida += "<td><button class='btn btn-primary btn-sm' onclick='mostrarFormularioEdicion(" 
        + respuesta.datos.idpedido + ", " 
        + "\"" + respuesta.datos.idcliente.replace(/"/g, '&quot;') + "\"" + ", " 
        + "\"" + respuesta.datos.fecha.replace(/"/g, '&quot;') + "\"" + ", " 
        + respuesta.datos.camarero + ", "
        + "\"" + respuesta.datos.total.replace(/"/g, '&quot;') + "\"" 
        + ")'>Editar</button></td>";
        tablaSalida += "</tr></tbody></table>";

        resultadoBusqueda.innerHTML = tablaSalida;
        resultadoBusqueda.style.display = 'block';

    } else { // Si hay error
        alert(respuesta.mensaje);
    }
}