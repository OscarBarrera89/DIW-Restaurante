"use strict";

class Cliente {
    constructor(idcliente, nombre, email, telefono) {
        this.idcliente = idcliente;
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
    }

}

//Sospecho que detalle pedido no es necesario y hay que borrarlo, lo dejo provisionalmente por si acaso
class Detalle_pedido {
    constructor(iddetalle, idpedido, idplato, cantidad) {
        this.iddetalle = iddetalle;
        this.idpedido = idpedido;
        this.idplato = idplato;
        this.cantidad = cantidad;
    }

}

class Menu {
    constructor(idplato, nombre, descripcion, precio, alergenos) {
        this.idplato = idplato;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.alergenos = alergenos;
    }

}

class Pedido {
    constructor(idpedido, idcliente, fecha, camarero, total) {
        this.idpedido = idpedido;
        this.idcliente = idcliente;
        this.fecha = fecha;
        this.camarero = camarero;
        this.total = total;
    }

}

class Restaurante{

    async altaCliente(oCliente) {
        let datos = new FormData();

        datos.append("cliente", JSON.stringify(oCliente));

        let respuesta = await peticionPOST("alta_cliente.php", datos);

        alert("Se ha dado de alta a el cliente")

        return respuesta;

    }

    async modificarCliente(oCliente) {
        let datos = new FormData();

        // Se podría pasar campo a campo al servidor
        // pero en esta ocasión vamos a pasar todos los datos 
        // en un solo parámetro cuyos datos van en formato JSON
        datos.append("cliente",JSON.stringify(oCliente));
       
        let respuesta = await peticionPOST("modificar_cliente.php", datos);

        return respuesta;
    }

    async borrarCliente(idCliente) {
        let datos = new FormData();

        datos.append("idcliente", idCliente);

        let respuesta = await peticionPOST("borrar_cliente.php", datos);

        return respuesta;
    }

    async buscarCliente(nombreCliente) {
        let datos = new FormData();

        datos.append("nombre", nombreCliente);

        let respuesta = await peticionPOST("buscar_cliente.php", datos);

        return respuesta;
    }

    async listadoCliented(){
        let datos = new FormData();

        let respuesta = await peticionGET("get_cliente.php", datos);

        if (respuesta.datos == null) {
            alert("No existe ningun cliente");
        }

        return respuesta;
    }

    //Termina parte de clientes





    async altaPedido(oPedido) {
        let datos = new FormData();

        // datos.append("cliente", oPedido.cliente);
        // datos.append("idplato", oPedido.idplato);
        // datos.append("unidades", oPedido.unidades);

        datos.append("pedido", JSON.stringify(oPedido));

        console.log("Datos:", datos);

        let respuesta = await peticionPOST("alta_pedido.php", datos);

        return respuesta;
    }

    async getPlatos() {
        let datos = new FormData();

        let respuesta = await peticionGET("get_platos.php", datos);

        return respuesta;
    }

    async listadoPedidoCliente(nombreCliente) {
        const datos = new FormData();

        datos.append("nombre", nombreCliente);

        const respuesta = await peticionGET("listado_pedidos.php", datos);

        if (respuesta.ok) {
            let listado = `<h1>Pedidos de ${nombreCliente}</h1>`;

            listado += "<table class='table table-hover table-striped'>";
            listado += "<thead><tr><th>IDPEDIDO</th><th>PLATO</th><th>UNIDADES</th>";
            listado += "<th>PRECIO</th><th>TOTAL</th></tr></thead><tbody>";

            for (let pedido of respuesta.datos) {
                listado += `<tr><td>${pedido.idpedido}</td>`;
                listado += `<td>${pedido.nombre}</td>`;
                listado += `<td>${pedido.unidades}</td>`;
                listado += `<td>${pedido.precio}</td>`;
                listado += `<td>${pedido.unidades * pedido.precio}</td></tr>`;
            }
            listado += "</tbody></table>";

            return listado;
        } else {
            return "<h1>Error al recuperar los datos</h1>"
        }
    }
}