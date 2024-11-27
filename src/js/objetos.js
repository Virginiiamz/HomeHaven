"use strict";

class Propiedad {
    constructor(idpropiedad, direccion, precio, tipovivienda, imagen) {
        this.idpropiedad = idpropiedad;
        this.direccion = direccion;
        this.precio = precio;
        this.tipovivienda = tipovivienda;
        this.imagen = imagen;
    }

    toJSON() {
        return {
            idpropiedad: this.idpropiedad,
            direccion: this.direccion,
            precio: this.precio,
            tipovivienda: this.tipovivienda,
            imagen: this.imagen
        };
    }
}

class Contrato {
    constructor(idcontrato, idpropiedad, idcliente, tipoventa, fecha, estado) {
        this.idcontrato = idcontrato;
        this.idpropiedad = idpropiedad;
        this.idcliente = idcliente;
        this.tipoventa = tipoventa;
        this.fecha = fecha;
        this.estado = estado;
    }

    toJSON() {
        return {
            idcontrato: this.idcontrato,
            idpropiedad: this.idpropiedad,
            idcliente: this.idcliente,
            tipoventa: this.tipoventa,
            fecha: this.fecha,
            estado: this.estado
        };
    }
}

class Cliente {
    constructor(idcliente, nombre, email, telefono, direccion) {
        this.idcliente = idcliente;
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.direccion = direccion;
    }

    toJSON() {
        return {
            idcliente: this.idcliente,
            nombre: this.nombre,
            email: this.email,
            telefono: this.telefono,
            direccion: this.direccion
        };
    }
}

class Inmobiliaria {
    // Métodos para Propiedades
    async altaPropiedad(oPropiedad) {
        let datos = new FormData();
        datos.append("propiedad", JSON.stringify(oPropiedad));

        let respuesta = await peticionPOST("alta_propiedad.php", datos);

        alert("Se ha dado de alta a la propiedad");
        return respuesta;
    }

    async modificarPropiedad(oPropiedad) {
        let datos = new FormData();
        datos.append("propiedad", JSON.stringify(oPropiedad));

        let respuesta = await peticionPOST("modificar_propiedad.php", datos);
        return respuesta;
    }

    async borrarPropiedad(idpropiedad) {
        let datos = new FormData();
        datos.append("idpropiedad", idpropiedad);

        let respuesta = await peticionPOST("borrar_propiedad.php", datos);
        return respuesta;
    }

    async buscarPropiedad(precioPropiedad) {
        let datos = new FormData();
        datos.append("precio", precioPropiedad);

        let respuesta = await peticionPOST("buscar_propiedad.php", datos);
        return respuesta;
    }

    async listadoPropiedad() {
        let datos = new FormData();

        let respuesta = await peticionGET("get_propiedad.php", datos);

        if (respuesta.datos == null) {
            alert("No existe ninguna propiedad");
        }

        return respuesta;
    }

    // Métodos para Contratos
    async altaContrato(oContrato) {
        let datos = new FormData();
        datos.append("contrato", JSON.stringify(oContrato));

        let respuesta = await peticionPOST("alta_contrato.php", datos);

        alert("Se ha dado de alta al contrato");
        return respuesta;
    }

    async modificarContrato(oContrato) {
        let datos = new FormData();
        datos.append("contrato", JSON.stringify(oContrato));

        let respuesta = await peticionPOST("modificar_contrato.php", datos);
        return respuesta;
    }

    async borrarContrato(idcontrato) {
        let datos = new FormData();
        datos.append("idcontrato", idcontrato);

        let respuesta = await peticionPOST("borrar_contrato.php", datos);
        return respuesta;
    }

    async buscarContrato(idpropiedad) {
        let datos = new FormData();
        datos.append("idpropiedad", idpropiedad);

        let respuesta = await peticionPOST("buscar_contrato.php", datos);
        return respuesta;
    }

    async listadoContrato() {
        let datos = new FormData();

        let respuesta = await peticionGET("get_contrato.php", datos);

        if (respuesta.datos == null) {
            alert("No existe ningún contrato");
        }

        return respuesta;
    }

    // Métodos para Clientes
    async altaCliente(oCliente) {
        let datos = new FormData();
        datos.append("cliente", JSON.stringify(oCliente));

        let respuesta = await peticionPOST("alta_cliente.php", datos);

        alert("Se ha dado de alta al cliente");
        return respuesta;
    }
    async buscarCliente(nombreCliente) {
        let datos = new FormData();
        datos.append("nombre", nombreCliente);

        let respuesta = await peticionPOST("buscar_cliente.php", datos);
        return respuesta;
    }

    async listadoCliente() {
        let datos = new FormData();

        let respuesta = await peticionGET("get_cliente.php", datos);

        if (respuesta.datos == null) {
            alert("No existe ningún cliente");

        return respuesta;
    }
}
    
}
