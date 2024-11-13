"use strict";

var oInmobiliaria = new Inmobiliaria();

registrarEventos();

function registrarEventos() {
    ocultarFormulario();

    document.querySelector("#mnuAltaPropiedad").addEventListener("click", mostrarFormulario);

    frmAltaPropiedad.AltaPropiedadBoton.addEventListener("click", procesarAltaPropiedad);

}

function mostrarFormulario(oEvento) {

    let opcion = oEvento.target.id; 

    ocultarFormulario();

    switch (opcion) {
        case "mnuAltaPropiedad":
            frmAltaPropiedad.style.display = "block";
           
            break;

        default:
            break;
    }

}

function ocultarFormulario() {
    frmAltaPropiedad.style.display = "none";
}

async function procesarAltaPropiedad() {

    let direccion = frmAltaPropiedad.AltaPropiedadDireccion.value.trim();
    let precio = parseFloat(frmAltaPropiedad.AltaPropiedadPrecio.value);
    let tipoPropiedad = frmAltaPropiedad.AltaPropiedadTipo.value;
    let imagen = frmAltaPropiedad.AltaPropiedadImagen.value;

    if (validarAltaPropiedad()) {
        let respuesta = await oInmobiliaria.altaPropiedad(new Propiedad(null, direccion, precio, tipoPropiedad, imagen));

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