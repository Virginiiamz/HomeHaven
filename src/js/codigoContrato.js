"use strict";

var oInmobiliaria = new Inmobiliaria();

ocultarFormularioContrato();
registrarEventosContrato();

function registrarEventosContrato() {

    document.querySelector("#mnuAltaContrato").addEventListener("click", mostrarFormularioContrato);
    document.querySelector("#mnuListadoContrato").addEventListener("click", mostrarFormularioContrato);
    document.querySelector("#mnuBuscarContrato").addEventListener("click", mostrarFormularioContrato);

    frmAltaContrato.altaContratoBoton.addEventListener("click", procesarAltaContrato);
    frmModContrato.modContratoBoton.addEventListener("click", procesarModificarContrato);
    frmBuscarContrato.ModContratoBoton.addEventListener("click", procesarBuscarContrato);

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

function mostrarFormularioContrato(oEvento) {

    let opcion = oEvento.target.id;

    ocultarFormularioContrato();

    switch (opcion) {
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

function ocultarFormularioContrato() {
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