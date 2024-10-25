const alertPlaceholder = document.getElementById('alertaInicSesion')
const appendAlert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div id="alertaInicio" class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    alertPlaceholder.append(wrapper)
}

const alertTrigger = document.getElementById('iniciarSesion')
if (alertTrigger) {
    alertTrigger.addEventListener('click', () => {
        appendAlert('Por ahora no puedes iniciar sesion. Vuelve a intentarlo proximamente...', 'danger')
    })
}