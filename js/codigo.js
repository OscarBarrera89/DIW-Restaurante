"use strict";

// Codificar aquí el programa principal
var oRestaurante = new Restaurante();

inicio();

function inicio(){
    document.querySelector("#mnuAltaPedido").addEventListener("click",mostrarFormulario);
    document.querySelector("#mnuListadoPedidosCliente").addEventListener("click",mostrarFormulario);
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

function cargarDesplegable(){
    const platos = oRestaurante.getPlatos();
    

}

function ocultarFormularios(){
    frmListadoPedidosCliente.classList.add("d-none");
    frmAltaPedido.classList.add("d-none");
}