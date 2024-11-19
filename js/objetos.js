"use strict";

class Pedido{
    #idpedido;
    #cliente;
    #idplato;
    #unidades;
    constructor(idpedido, cliente, idplato, unidades){
        this.#idpedido = idpedido;
        this.#cliente = cliente;
        this.#idplato = idplato;
        this.#unidades = unidades;
    }

    get idpedido(){
        return this.#idpedido;
    }
    get cliente(){
        return this.#cliente;
    }
    get idplato(){
        return this.#idplato;
    }
    get unidades(){
        return this.#unidades;
    }

    set idpedido(valor){
        this.#idpedido = valor;
    }
    set cliente(valor){
        this.#cliente = valor;
    }
    set idplato(valor){
        this.#idplato = valor;
    }
    set unidades(valor){
        this.#unidades = valor;
    }
}

class Plato {
    #idplato;
    #nombre;
    #descripcion;
    #precio;
    constructor(idplato,nombre, descripcion, precio){
        this.#idplato = idplato;
        this.#nombre = nombre;
        this.#descripcion = descripcion;
        this.#precio = precio;
    }

    get idplato(){
        return this.#idplato;
    }
    get nombre(){
        return this.#nombre;
    }
    get descripcion(){
        return this.#descripcion;
    }
    get precio(){
        return this.#precio;
    }

    set idplato(valor){
        this.#idplato = valor;
    }
    set nombre(valor){
        this.#nombre = valor;
    }
    set descripcion(valor){
        this.#descripcion = valor;
    }
    set precio(valor){
        this.#precio = valor;
    }
}

class Bar{
    altaPedido(oPedido){

    }

    async getPlatos(){
        let datos = new FormData();

        let respuesta = await peticionGET("get_platos.php", datos);

        return respuesta;
    }

    listadoPedidoCliente(nombreCliente){

    }
}