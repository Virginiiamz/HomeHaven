const clienteForm = document.getElementById("clienteForm");
const tablaClientes = document.getElementById("tablaClientes");
const buscar = document.getElementById("buscar");
const idClienteInput = document.getElementById("idcliente");

// Cargar clientes al inicio
document.addEventListener("DOMContentLoaded", obtenerClientes);

// Obtener clientes
function obtenerClientes(termino = "") {
    fetch(`listar_clientes.php?termino=${termino}`)
        .then(response => response.json())
        .then(data => {
            if (!data.error) {
                renderClientes(data.datos);
            } else {
                alert(data.mensaje);
            }
        });
}

// Renderizar clientes en la tabla
function renderClientes(clientes) {
    tablaClientes.innerHTML = "";
    clientes.forEach(cliente => {
        tablaClientes.innerHTML += `
            <tr>
                <td>${cliente.idcliente}</td>
                <td>${cliente.nombre}</td>
                <td>${cliente.dni}</td>
                <td>${cliente.email}</td>
                <td>${cliente.telefono}</td>
                <td>${cliente.direccion}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editarCliente(${cliente.idcliente})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarCliente(${cliente.idcliente})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

// Guardar cliente (alta o modificación)
clienteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(clienteForm);
    const endpoint = idClienteInput.value ? "modificar_cliente.php" : "alta_cliente.php";

    fetch(endpoint, { method: "POST", body: formData })
        .then(response => response.json())
        .then(data => {
            if (!data.error) {
                obtenerClientes();
                clienteForm.reset();
            } else {
                alert(data.mensaje);
            }
        });
});

// Buscar cliente
buscar.addEventListener("input", () => {
    obtenerClientes(buscar.value);
});

// Editar cliente
function editarCliente(idcliente) {
    fetch(`get_cliente.php?idcliente=${idcliente}`)
        .then(response => response.json())
        .then(data => {
            if (!data.error) {
                const { nombre, dni, email, telefono, direccion } = data.datos;
                document.getElementById("idcliente").value = idcliente;
                document.getElementById("nombre").value = nombre;
                document.getElementById("dni").value = dni;
                document.getElementById("email").value = email;
                document.getElementById("telefono").value = telefono;
                document.getElementById("direccion").value = direccion;
            } else {
                alert(data.mensaje);
            }
        });
}

// Eliminar cliente
function eliminarCliente(idcliente) {
    if (confirm("¿Desea eliminar este cliente?")) {
        fetch("borrar_cliente.php", {
            method: "POST",
            body: new URLSearchParams({ idcliente }),
        })
            .then(response => response.json())
            .then(data => {
                if (!data.error) {
                    obtenerClientes();
                } else {
                    alert(data.mensaje);
                }
            });
    }
}
