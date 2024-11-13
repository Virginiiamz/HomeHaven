"use strict";

var oInmobiliaria = new Inmobiliaria();

registrarEventos();

function registrarEventos() {
    ocultarFormulario();

    document.querySelector("#mnuAltaPropiedad").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuListadoPropiedad").addEventListener("click", mostrarFormulario);

    frmAltaPropiedad.AltaPropiedadBoton.addEventListener("click", procesarAltaPropiedad);

}

function mostrarFormulario(oEvento) {

    let opcion = oEvento.target.id;

    ocultarFormulario();

    switch (opcion) {
        case "mnuAltaPropiedad":
            frmAltaPropiedad.style.display = "block";
            break;
        case "mnuListadoPropiedad":
            listadoPropiedad.style.display = "block";
            procesarListadoPorPropiedad();
            break;

        default:
            break;
    }

}

function ocultarFormulario() {
    frmAltaPropiedad.style.display = "none";
    listadoPropiedad.style.display = "none";
    frmModPropiedad.style.display = "none";
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

async function procesarListadoPorPropiedad() {

    let respuesta = await oInmobiliaria.listadoPropiedad();

    let tabla = "<h2>Listado de propiedades</h2>";

    tabla += "<table class='table table-striped' id='listadoPorPropiedad'>";
    tabla += "<thead><tr><th>ID</th><th>DIRECCION</th><th>PRECIO</th><th>TIPOVIVIENDA</th><th>IMAGEN</th><th colspan='2'>ACCION</th></tr></thead><tbody>";

    for (let propiedad of respuesta.datos) {
        tabla += "<tr><td>" + propiedad.idpropiedad + "</td>";
        tabla += "<td>" + propiedad.direccion + "</td>";
        tabla += "<td>" + propiedad.precio + "</td>";
        tabla += "<td>" + propiedad.tipovivienda + "</td>";
        tabla += "<td>" + propiedad.imagen + "</td>";

        tabla += "<td><button class='btn btn-primary modificarPropiedad' data-componente='" + JSON.stringify(propiedad) + "'><i class='bi bi-pencil-square'></i></button><button class='btn btn-danger ms-3 eliminarPropiedad' data-componente='" + JSON.stringify(propiedad) + "'><i class='bi bi-trash'></i></button></td></tr>";
    }

    tabla += "</tbody></table>";

    // Agregamos el contenido a la capa de listados
    document.querySelector("#listadoPropiedad").innerHTML = tabla;
    // Agregar manejador de evento para toda la tabla
    document.querySelector("#listadoPorPropiedad").addEventListener("click", (event) => {
        if (event.target.closest(".modificarPropiedad")) { //si el icono pulsado es el de modificar, ejecuta la funcion
            procesarBotonEditarPropiedad(event);
        }
    });

}

function procesarBotonEditarPropiedad(event) {
    // alert("has pulsado el boton modificar con id: " + oEvento.target.dataset.propiedad);
    console.log(event.target.closest(".modificarPropiedad").dataset.propiedad);
    

    frmModPropiedad.style.display = "block";
    let propiedad = JSON.parse(event.target.closest(".modificarPropiedad").dataset.propiedad);
    console.log(propiedad);
    

    frmModPropiedad.ModPropiedadDireccion.value = propiedad.direccion;
    frmModPropiedad.ModPropiedadPrecio.value = propiedad.precio;
    frmModPropiedad.ModPropiedadTipo.value = propiedad.tipovivienda;

    //     actualizarDesplegableTipos(componente.idtipo);
}