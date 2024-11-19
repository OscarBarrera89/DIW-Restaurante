"use strict";

// Codificar aquí el programa principal
var oRestaurante = new Restaurante();

inicio();

function inicio(){
    document.querySelector("#mnuAltaPedido").addEventListener("click",mostrarFormulario);
    document.querySelector("#mnuListadoPedidosCliente").addEventListener("click",mostrarFormulario);

    frmAltaPedido.btnAltaPedido.addEventListener("click",procesarAltaPedido);
    frmListadoPedidosCliente.btnListadoPedidosCliente.addEventListener("click",procesarListadoPedidos)
}

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


function mostrarFormulario(oEvento){
    ocultarFormularios();

    switch (oEvento.target.id){
        case "mnuAltaPedido":
            frmAltaPedido.classList.remove("d-none");
            cargarDesplegable();
            break;

        case "mnuListadoPedidosCliente":
            frmListadoPedidosCliente.classList.remove("d-none");
            break;
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

function ocultarFormularios(){
    frmListadoPedidosCliente.classList.add("d-none");
    frmAltaPedido.classList.add("d-none");
    document.querySelector("#listado").classList.add("d-none");
}