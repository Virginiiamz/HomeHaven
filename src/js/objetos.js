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
}