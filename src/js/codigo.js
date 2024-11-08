"use strict";

var oPropiedad;

registrarEventos();

function registrarEventos() {
    
    frmAltaPropiedad.AltaPropiedadBoton.addEventListener("click", procesarAltaPropiedad);

}

async function procesarAltaPropiedad() {
    
    let direccion = frmAltaPropiedad.AltaPropiedadDireccion.value.trim();
    let precio = frmAltaPropiedad.AltaPropiedadPrecio.value;
    let tipoPropiedad = frmAltaPropiedad.AltaPropiedadTipo.value;
    // let imagen = frmAltaPropiedad.AltaPropiedadImagen.files[0];

    if (validarAltaPropiedad(precio)) {
        let respuesta = await oPropiedad.altaPropiedad(new Propiedad(null, direccion, precio, tipoPropiedad));
        alert(respuesta.mensaje);

        if (!respuesta.error) {
            frmAltaPropiedad.reset();
        }
    }

}

function validarAltaPropiedad(precio) {

    let valido = true;
    let errores = "";

    if (precio < 0) {
        errores += "El precio tiene que ser positivo";
        valido = false;
    }

    if (!valido) {
        alert(errores);
    }
}