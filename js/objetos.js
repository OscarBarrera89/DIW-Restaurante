class Cliente {
    #_idcliente;
    #_nombre;
    #_email;
    #_telefono;

    constructor(idcliente, nombre, email, telefono) {
        this.#_idcliente = idcliente;
        this.#_nombre = nombre;
        this.#_email = email;
        this.#_telefono = telefono;
    }

    // Getters
    get idcliente() {
        return this.#_idcliente;
    }
    get nombre() {
        return this.#_nombre;
    }
    get email() {
        return this.#_email;
    }
    get telefono() {
        return this.#_telefono;
    }

    // Setters
    set idcliente(value) {
        this.#_idcliente = value;
    }
    set nombre(value) {
        this.#_nombre = value;
    }
    set email(value) {
        this.#_email = value;
    }
    set telefono(value) {
        this.#_telefono = value;
    }

    // Método para personalizar la salida JSON
    toJSON() {
        return {
            idcliente: this.#_idcliente,
            nombre: this.#_nombre,
            email: this.#_email,
            telefono: this.#_telefono
        };
    }
}

class Detalle_pedido {
    #_iddetalle;
    #_idpedido;
    #_idplato;
    #_cantidad;

    constructor(iddetalle, idpedido, idplato, cantidad) {
        this.#_iddetalle = iddetalle;
        this.#_idpedido = idpedido;
        this.#_idplato = idplato;
        this.#_cantidad = cantidad;
    }

    // Getters
    get iddetalle() {
        return this.#_iddetalle;
    }
    get idpedido() {
        return this.#_idpedido;
    }
    get idplato() {
        return this.#_idplato;
    }
    get cantidad() {
        return this.#_cantidad;
    }

    // Setters
    set iddetalle(value) {
        this.#_iddetalle = value;
    }
    set idpedido(value) {
        this.#_idpedido = value;
    }
    set idplato(value) {
        this.#_idplato = value;
    }
    set cantidad(value) {
        this.#_cantidad = value;
    }

    // Método para personalizar la salida JSON
    toJSON() {
        return {
            iddetalle: this.#_iddetalle,
            idpedido: this.#_idpedido,
            idplato: this.#_idplato,
            cantidad: this.#_cantidad
        };
    }
}

class Menu {
    #_idplato;
    #_nombre;
    #_descripcion;
    #_precio;
    #_alergenos;

    constructor(idplato, nombre, descripcion, precio, alergenos) {
        this.#_idplato = idplato;
        this.#_nombre = nombre;
        this.#_descripcion = descripcion;
        this.#_precio = precio;
        this.#_alergenos = alergenos;
    }

    // Getters
    get idplato() {
        return this.#_idplato;
    }
    get nombre() {
        return this.#_nombre;
    }
    get descripcion() {
        return this.#_descripcion;
    }
    get precio() {
        return this.#_precio;
    }
    get alergenos() {
        return this.#_alergenos;
    }

    // Setters
    set idplato(value) {
        this.#_idplato = value;
    }
    set nombre(value) {
        this.#_nombre = value;
    }
    set descripcion(value) {
        this.#_descripcion = value;
    }
    set precio(value) {
        this.#_precio = value;
    }
    set alergenos(value) {
        this.#_alergenos = value;
    }

    // Método para personalizar la salida JSON
    toJSON() {
        return {
            idplato: this.#_idplato,
            nombre: this.#_nombre,
            descripcion: this.#_descripcion,
            precio: this.#_precio,
            alergenos: this.#_alergenos
        };
    }
}

class Pedido {
    #_idpedido;
    #_idcliente;
    #_fecha;
    #_camarero;
    #_total;

    constructor(idpedido, idcliente, fecha, camarero, total) {
        this.#_idpedido = idpedido;
        this.#_idcliente = idcliente;
        this.#_fecha = fecha;
        this.#_camarero = camarero;
        this.#_total = total;
    }

    // Getters
    get idpedido() {
        return this.#_idpedido;
    }
    get idcliente() {
        return this.#_idcliente;
    }
    get fecha() {
        return this.#_fecha;
    }
    get camarero() {
        return this.#_camarero;
    }
    get total() {
        return this.#_total;
    }

    // Setters
    set idpedido(value) {
        this.#_idpedido = value;
    }
    set idcliente(value) {
        this.#_idcliente = value;
    }
    set fecha(value) {
        this.#_fecha = value;
    }
    set camarero(value) {
        this.#_camarero = value;
    }
    set total(value) {
        this.#_total = value;
    }

    // Método para personalizar la salida JSON
    toJSON() {
        return {
            idpedido: this.#_idpedido,
            idcliente: this.#_idcliente,
            fecha: this.#_fecha,
            camarero: this.#_camarero,
            total: this.#_total
        };
    }
}

class Restaurante{
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
