"use strict";

var oInmobiliaria = new Inmobiliaria();

registrarEventos();

function registrarEventos() {
    
    frmAltaPropiedad.AltaPropiedadBoton.addEventListener("click", procesarAltaPropiedad);

}

async function procesarAltaPropiedad() {
    alert("ha entrado en procesar alta propiedad");
    
    let direccion = frmAltaPropiedad.AltaPropiedadDireccion.value.trim();
    let precio = parseFloat(frmAltaPropiedad.AltaPropiedadPrecio.value);
    let tipoPropiedad = frmAltaPropiedad.AltaPropiedadTipo.value;
    // let imagen = frmAltaPropiedad.AltaPropiedadImagen.files[0];

    if (validarAltaPropiedad()) {
        alert("ha entrado en validad alta propiedad");
        let respuesta = await oInmobiliaria.altaPropiedad(new Propiedad(null, direccion, precio, tipoPropiedad, null));
        alert(respuesta.mensaje);

        if (!respuesta.error) {
            frmAltaPropiedad.reset();
        }
    }

}

function validarAltaPropiedad() {

    let precio = frmAltaPropiedad.AltaPropiedadPrecio.value;

    let valido = true;
    let errores = "";

    if (precio < 0) {
        errores += "El precio tiene que ser positivo";
        valido = false;
    }

    if (!valido) {
        alert(errores);
    }

    return valido;
}