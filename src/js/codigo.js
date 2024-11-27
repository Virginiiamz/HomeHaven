"use strict";

var oInmobiliaria = new Inmobiliaria();

registrarEventos();

function registrarEventos() {
    ocultarFormulario();

    // Formularios
    document.querySelector("#mnuAltaPropiedad").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuListadoPropiedad").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuBuscarPropiedad").addEventListener("click", mostrarFormulario);

    document.querySelector("#mnuAltaContrato").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuListadoContrato").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuBuscarContrato").addEventListener("click", mostrarFormulario);

 // Botones de los formularios
    frmAltaContrato.altaContratoBoton.addEventListener("click", procesarAltaContrato);
    frmModContrato.modContratoBoton.addEventListener("click", procesarModificarContrato);
    frmBuscarContrato.ModContratoBoton.addEventListener("click", procesarBuscarContrato);
   
    frmAltaPropiedad.AltaPropiedadBoton.addEventListener("click", procesarAltaPropiedad);
    frmModPropiedad.ModPropiedadBoton.addEventListener("click", procesarModificarPropiedad);
    frmBuscarPropiedad.ModPropiedadBoton.addEventListener("click", procesarBuscarPropiedad);
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
        case "mnuBuscarPropiedad":
            frmBuscarPropiedad.style.display = "block";
            break;
        case "mnuAltaContrato":
            frmAltaContrato.style.display = "block";
            break;
        case "mnuListadoContrato":
            listadoContrato.style.display = "block";
            procesarListadoPorContrato();
            break;
        case "mnuBuscarContrato":
            frmBuscarContrato.style.display = "block";
            break;
        default:
            break;
    }

}

function ocultarFormulario() {
    frmAltaContrato.style.display = "none";
    listadoContrato.style.display = "none";
    frmModContrato.style.display = "none";
    frmBuscarContrato.style.display = "none";
    

    resultadoBusquedaContrato.innerHTML = "";

    frmAltaPropiedad.style.display = "none";
    listadoPropiedad.style.display = "none";
    frmModPropiedad.style.display = "none";
    frmBuscarPropiedad.style.display = "none";

    resultadoBusquedaPropiedad.innerHTML = "";
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

        tabla += "<td><button class='btn btn-primary modificarPropiedad' data-propiedad='" + JSON.stringify(propiedad) + "'><i class='bi bi-pencil-square'></i></button><button class='btn btn-danger ms-3 eliminarPropiedad' data-propiedad='" + JSON.stringify(propiedad) + "'><i class='bi bi-trash'></i></button></td></tr>";
    }

    tabla += "</tbody></table>";

    // Agregamos el contenido a la capa de listados
    document.querySelector("#listadoPropiedad").innerHTML = tabla;
    // Agregar manejador de evento para toda la tabla
    document.querySelector("#listadoPorPropiedad").addEventListener("click", procesarBotonEditarPropiedad)

}

function procesarBotonEditarPropiedad(oEvento) {

    let boton = null;

    // Verificamos si han hecho clic sobre el botón o el icono
    if (oEvento.target.nodeName == "I" || oEvento.target.nodeName == "button") {
        if (oEvento.target.nodeName == "I") {
            // Pulsacion sobre el icono
            boton = oEvento.target.parentElement; // El padre es el boton
        } else {
            boton = oEvento.target;
        }

        let propiedad = JSON.parse(boton.dataset.propiedad);

        if (boton.classList.contains("modificarPropiedad")) {
            frmModPropiedad.style.display = "block";

            frmModPropiedad.ModPropiedadId.value = propiedad.idpropiedad;
            frmModPropiedad.ModPropiedadDireccion.value = propiedad.direccion;
            frmModPropiedad.ModPropiedadPrecio.value = propiedad.precio;
            frmModPropiedad.ModPropiedadTipo.value = propiedad.tipovivienda;
            frmModPropiedad.ModPropiedadImagen.value = propiedad.imagen;

        } else if (boton.classList.contains("eliminarPropiedad")) {
            borrarPropiedad(propiedad);
        }
    }
}

async function procesarModificarPropiedad() {

    let idpropiedad = parseInt(frmModPropiedad.ModPropiedadId.value);
    let direccion = frmModPropiedad.ModPropiedadDireccion.value.trim();
    let precio = parseFloat(frmModPropiedad.ModPropiedadPrecio.value);
    let tipovivienda = frmModPropiedad.ModPropiedadTipo.value;
    let imagen = frmModPropiedad.ModPropiedadImagen.value;

    // Validar datos del formulario
    if (validarModificarPropiedad()) {
        let propiedad = new Propiedad(idpropiedad, direccion, precio, tipovivienda, imagen);

        let respuesta = await oInmobiliaria.modificarPropiedad(propiedad);

        alert(respuesta.mensaje);

        if (!respuesta.error) { // Si NO hay error
            //Resetear formulario
            frmModPropiedad.reset();
            // Ocultar el formulario
            frmModPropiedad.style.display = "none";
        }

    }

}

function validarModificarPropiedad() {

    let precio = frmModPropiedad.ModPropiedadPrecio.value;

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

async function borrarPropiedad(oEvento) {

    let respuesta = await oInmobiliaria.borrarPropiedad(oEvento.idpropiedad);

    alert(respuesta.mensaje);

    if (!respuesta.error) { // Si NO hay error
        // Borrado de la tabla html
        document.querySelector("#listadoPropiedad").addEventListener("load", location.reload());
    }

}

async function procesarBuscarPropiedad() {
    let precioPropiedad = parseFloat(frmBuscarPropiedad.buscarPropiedadPrecio.value.trim());

    let respuesta = await oInmobiliaria.buscarPropiedad(precioPropiedad);

    if (!respuesta.error) { // Si NO hay error
        let resultadoBusqueda = document.querySelector("#resultadoBusquedaPropiedad");

        // Escribimos resultado
        let tablaSalida = "<table class='table'>";
        tablaSalida += "<thead><tr><th>IDPROPIEDAD</th><th>DIRECCION</th><th>PRECIO</th><th>TIPOVIVIENDA</th><th>IMAGEN</th></tr></thead>";
        tablaSalida += "<tbody><tr>";
        tablaSalida += "<td>" + respuesta.datos.idpropiedad + "</td>"
        tablaSalida += "<td>" + respuesta.datos.direccion + "</td>"
        tablaSalida += "<td>" + respuesta.datos.precio + "</td>"
        tablaSalida += "<td>" + respuesta.datos.tipovivienda + "</td>"
        tablaSalida += "<td>" + respuesta.datos.imagen + "</td>"
        tablaSalida += "</tr></tbody></table>";

        resultadoBusqueda.innerHTML = tablaSalida;
        resultadoBusqueda.style.display = 'block';

        frmBuscarPropiedad.reset();

    } else { // Si hay error
        alert(respuesta.mensaje);
    }
}

async function procesarAltaContrato() { 
    let idpropiedad = frmAltaContrato.altaContratoIdPropiedad.value;
    let idcliente = frmAltaContrato.altaContratoIdCliente.value;
    let tipoContrato = frmAltaContrato.altaContratoTipoTrato.value;
    let fechaContrato = frmAltaContrato.altaContratoFecha.value;
    let estadoContrato = frmAltaContrato.altaContratoEstado.value;

    if (validarAltaContrato()){
        let respuesta = await oInmobiliaria.altaContrato(new Contrato(null, idpropiedad, idcliente, tipoContrato, fechaContrato, estadoContrato));

        if (!respuesta.error) {
            frmAltaContrato.reset();
        }
    }
}

function validarAltaContrato(){
    let valido=true;
    let idpropiedad = frmAltaContrato.altaContratoIdPropiedad.value;
    let idcliente = frmAltaContrato.altaContratoIdCliente.value;
    let tipoContrato = frmAltaContrato.altaContratoTipoTrato.value;
    let fechaContrato = frmAltaContrato.altaContratoFecha.value;
    let estadoContrato = frmAltaContrato.altaContratoEstado.value;

    if (idpropiedad<0 || idpropiedad==null){
        valido=false;
    }
    if (idcliente<0 || idcliente==null){
        valido=false;
    }
    if (tipoContrato==null){
        valido=false;
    }
    if (fechaContrato==null){
        valido=false;
    }
    if (estadoContrato==null){
        valido=false;
    }

    return valido;
}
async function procesarListadoPorContrato() {

    let respuesta = await oInmobiliaria.listadoContrato();

    let tabla = "<h2>Listado de Contratos</h2>";

    tabla += "<table class='table table-striped' id='listadoPorContrato'>";
    tabla += "<thead><tr><th>ID Contrato</th><th>ID Propiedad</th><th>ID Cliente</th><th>Tipo de Contrato</th><th>Fecha</th><th>Estado de venta</th></tr></thead><tbody>";

    for (let contrato of respuesta.datos) {
        tabla += "<tr><td>" + contrato.idcontrato + "</td>";
        tabla += "<td>" + contrato.idpropiedad + "</td>";
        tabla += "<td>" + contrato.idcliente + "</td>";
        tabla += "<td>" + contrato.tipoventa + "</td>";
        tabla += "<td>" + contrato.fecha + "</td>";
        tabla += "<td>" + contrato.estado + "</td>";
        tabla += "<td><button class='btn btn-primary modificarContrato' data-contrato='" + JSON.stringify(contrato) + "'><i class='bi bi-pencil-square'></i></button><button class='btn btn-danger ms-3 eliminarContrato' data-contrato='" + JSON.stringify(contrato) + "'><i class='bi bi-trash'></i></button></td></tr>";
    }

    tabla += "</tr></tbody></table>";

    // Agregamos el contenido a la capa de listados
    document.querySelector("#listadoContrato").innerHTML = tabla;
    // Agregar manejador de evento para toda la tabla
    document.querySelector("#listadoPorContrato").addEventListener("click", procesarBotonEditarContrato)

}

function procesarBotonEditarContrato(oEvento) {

    let boton = null;

    // Verificamos si han hecho clic sobre el botón o el icono
    if (oEvento.target.nodeName == "I" || oEvento.target.nodeName == "button") {
        if (oEvento.target.nodeName == "I") {
            // Pulsacion sobre el icono
            boton = oEvento.target.parentElement; // El padre es el boton
        } else {
            boton = oEvento.target;
        }

        let contrato = JSON.parse(boton.dataset.contrato);

        if (boton.classList.contains("modificarContrato")) {
            frmModContrato.style.display = "block";

            frmModContrato.modContratoIdContrato.value = contrato.idcontrato;
            frmModContrato.modContratoIdPropiedad.value = contrato.idpropiedad;
            frmModContrato.modContratoIdCliente.value = contrato.idcliente;
            frmModContrato.modContratoTipoTrato.value = contrato.tipoventa;
            frmModContrato.modContratoFecha.value = contrato.fecha;
            frmModContrato.modContratoEstado.value = contrato.estado;

        } else if (boton.classList.contains("eliminarContrato")) {
            borrarContrato(contrato);
        }
    }
}

async function borrarContrato(oEvento) {

    let respuesta = await oInmobiliaria.borrarContrato(oEvento.idcontrato);

    alert(respuesta.mensaje);

    if (!respuesta.error) { // Si NO hay error
        // Borrado de la tabla html
        document.querySelector("#listadoContrato").addEventListener("load", location.reload());
    }

}

async function procesarModificarContrato() {

    let idcontrato = frmModContrato.modContratoIdContrato.value;
    let idpropiedad = frmModContrato.modContratoIdPropiedad.value;
    let idcliente = frmModContrato.modContratoIdCliente.value;
    let tipoventa = frmModContrato.modContratoTipoTrato.value;
    let fecha = frmModContrato.modContratoFecha.value;
    let estado = frmModContrato.modContratoEstado.value

    // Validar datos del formulario
    if (validarModificarContrato()) {
        let contrato = new Contrato(idcontrato, idpropiedad, idcliente, tipoventa, fecha, estado);

        let respuesta = await oInmobiliaria.modificarContrato(contrato);

        alert(respuesta.mensaje);

        if (!respuesta.error) { // Si NO hay error
            //Resetear formulario
            frmModContrato.reset();
            // Ocultar el formulario
            frmModContrato.style.display = "none";
        }

    }

}

function validarModificarContrato() {

    let idpropiedad = frmModContrato.modContratoIdPropiedad.value;

    let valido = true;
    let errores = "";

    if (idpropiedad == null || idpropiedad <0) {
        errores += "Id Propiedad no apta";
        valido = false;
    }

    if (!valido) {
        alert(errores);
    }

    return valido;
}

async function procesarBuscarContrato() {
    let idpropiedad = frmBuscarContrato.buscarContratoIdPropiedad.value;

    let respuesta = await oInmobiliaria.buscarContrato(idpropiedad);


    if (!respuesta.error) { // Si NO hay error
        let resultadoBusqueda = document.querySelector("#resultadoBusquedaContrato");
        
        let tabla = "<table class='table'>";
        tabla += "<thead><tr><th>ID Contrato</th><th>ID Propiedad</th><th>ID Cliente</th><th>Tipo de contrato</th><th>Fecha</th><th>Estado</th></tr></thead>";
        tabla += "<tbody>";
        let contrato = respuesta.datos
            tabla += "<tr><td>" + contrato.idcontrato + "</td>";
            tabla += "<td>" + contrato.idpropiedad + "</td>";
            tabla += "<td>" + contrato.idcliente + "</td>";
            tabla += "<td>" + contrato.tipoventa + "</td>";
            tabla += "<td>" + contrato.fecha + "</td>";
            tabla += "<td>" + contrato.estado + "</td></tr>";
        // Escribimos resultado
        
        tabla += "</tbody></table>";

        resultadoBusqueda.innerHTML = tabla;
        resultadoBusqueda.style.display = 'block';


    } else { // Si hay error
        alert(respuesta.mensaje);
    }
}