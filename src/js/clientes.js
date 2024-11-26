// clientes.js

// Variables Globales
const apiUrl = "api/clientes.php";
const tablaClientes = document.getElementById("tablaClientes");
const formularioCliente = document.getElementById("formCliente");
const alertas = document.getElementById("alertas");

// Función para mostrar mensajes de alerta
function mostrarAlerta(tipo, mensaje) {
    alertas.innerHTML = `<div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
}

// Función para limpiar el formulario
function limpiarFormulario() {
    formularioCliente.reset();
}

// Función para listar clientes
async function listarClientes() {
    try {
        const response = await fetch(`${apiUrl}?accion=listar`);
        const data = await response.json();

        if (data.error) {
            mostrarAlerta("danger", data.mensaje);
        } else {
            let filas = "";
            data.datos.forEach(cliente => {
                filas += `
                    <tr>
                        <td>${cliente.id}</td>
                        <td>${cliente.nombre}</td>
                        <td>${cliente.email}</td>
                        <td>${cliente.telefono}</td>
                        <td>
                            <button class="btn btn-warning btn-sm" onclick="editarCliente(${cliente.id})">Editar</button>
                            <button class="btn btn-danger btn-sm" onclick="eliminarCliente(${cliente.id})">Eliminar</button>
                        </td>
                    </tr>`;
            });
            tablaClientes.innerHTML = filas;
        }
    } catch (error) {
        mostrarAlerta("danger", "Error al cargar los clientes.");
    }
}

// Función para agregar o modificar un cliente
async function guardarCliente(event) {
    event.preventDefault();

    const formData = new FormData(formularioCliente);
    const id = formData.get("id");
    const accion = id ? "modificar" : "alta";

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            body: JSON.stringify({
                accion: accion,
                datos: Object.fromEntries(formData.entries())
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();

        if (data.error) {
            mostrarAlerta("danger", data.mensaje);
        } else {
            mostrarAlerta("success", data.mensaje);
            listarClientes();
            limpiarFormulario();
        }
    } catch (error) {
        mostrarAlerta("danger", "Error al guardar el cliente.");
    }
}

// Función para buscar cliente y cargarlo en el formulario
async function editarCliente(id) {
    try {
        const response = await fetch(`${apiUrl}?accion=buscar&id=${id}`);
        const data = await response.json();

        if (data.error) {
            mostrarAlerta("danger", data.mensaje);
        } else {
            const cliente = data.datos;
            formularioCliente.nombre.value = cliente.nombre;
            formularioCliente.email.value = cliente.email;
            formularioCliente.telefono.value = cliente.telefono;
            formularioCliente.id.value = cliente.id;
        }
    } catch (error) {
        mostrarAlerta("danger", "Error al buscar el cliente.");
    }
}

// Función para eliminar un cliente
async function eliminarCliente(id) {
    if (!confirm("¿Está seguro de que desea eliminar este cliente?")) return;

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            body: JSON.stringify({ accion: "borrar", id: id }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();

        if (data.error) {
            mostrarAlerta("danger", data.mensaje);
        } else {
            mostrarAlerta("success", data.mensaje);
            listarClientes();
        }
    } catch (error) {
        mostrarAlerta("danger", "Error al eliminar el cliente.");
    }
}

// Evento para el envío del formulario
formularioCliente.addEventListener("submit", guardarCliente);

// Cargar clientes al iniciar
document.addEventListener("DOMContentLoaded", listarClientes);
