"use strict";

class Propiedad {

    constructor(idpropiedad, direccion, precio, tipovivienda, imagen) {
        this.idpropiedad = idpropiedad;
        this.direccion = direccion;
        this.precio = precio;
        this.tipovivienda = tipovivienda;
        this.imagen = imagen;
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

    toJSON(){
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

// Añadir class cliente

class Inmobiliaria {
    async altaPropiedad(oPropiedad) {
        let datos = new FormData();

        datos.append("propiedad", JSON.stringify(oPropiedad));

        let respuesta = await peticionPOST("alta_propiedad.php", datos);

        alert("Se ha dado de alta a la propiedad")

        return respuesta;

    }

    async modificarPropiedad(oPropiedad) {
        let datos = new FormData();

        // Se podría pasar campo a campo al servidor
        // pero en esta ocasión vamos a pasar todos los datos 
        // en un solo parámetro cuyos datos van en formato JSON
        datos.append("propiedad",JSON.stringify(oPropiedad));
       
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

    async listadoPropiedad(){
        let datos = new FormData();

        let respuesta = await peticionGET("get_propiedad.php", datos);

        if (respuesta.datos == null) {
            alert("No existe ninguna propiedad");
        }

        return respuesta;
    }

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
}