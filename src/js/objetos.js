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

class Inmobiliaria {
    async altaPropiedad(oPropiedad) {
        let datos = new FormData();

        datos.append("propiedad", JSON.stringify(oPropiedad));

        let respuesta = await peticionPOST("alta_propiedad.php", datos);

        return respuesta;

    }
}