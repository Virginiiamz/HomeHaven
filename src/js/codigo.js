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

        tabla += "<td><button class='btn btn-primary' id='modificarPropiedad' data-componente='" + JSON.stringify(propiedad) + "'><i class='bi bi-pencil-square'></i></button><button class='btn btn-danger ms-3' id='eliminarPropiedad' data-componente='" + JSON.stringify(propiedad) + "'><i class='bi bi-trash'></i></button></td></tr>";
    }

    tabla += "</tbody></table>";

    // Agregamos el contenido a la capa de listados
    document.querySelector("#listadoPropiedad").innerHTML = tabla;
    // Agregar manejador de evento para toda la tabla
    document.querySelector("#modificarPropiedad").addEventListener('click', procesarBotonEditarPropiedad);

}

function procesarBotonEditarPropiedad(oEvento) {
    alert("has pulsado el boton modificar con id: " + oEvento.target.parentElement);
    // let boton = null;

    // // Verificamos si han hecho clic sobre el botón o el icono
    // if (oEvento.target.nodeName == "I" || oEvento.target.nodeName == "button") {
    //     if (oEvento.target.nodeName == "I") {
    //         // Pulsacion sobre el icono
    //         boton = oEvento.target.parentElement; // El padre es el boton
    //     } else {
    //         boton = oEvento.target;
    //     }

    //     // 1.Ocultar todos los formularios
    //     ocultarFormularios();
    //     // 2.Mostrar el formulario de modificación de componentes
    //     frmModificarComponente.style.display = "block";
    //     // 3. Rellenar los datos de este formulario con los del componente
    //     let componente = JSON.parse(boton.dataset.componente);

    //     frmModificarComponente.txtModIdComponente.value = componente.idcomponente;
    //     frmModificarComponente.txtModNombre.value = componente.nombre;
    //     frmModificarComponente.txtModDescripcion.value = componente.descripcion;
    //     frmModificarComponente.txtModPrecio.value = componente.precio;
    //     actualizarDesplegableTipos(componente.idtipo);


    // }
}