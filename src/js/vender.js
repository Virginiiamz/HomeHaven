document.getElementById('venderForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var button = document.getElementById('submitBtn');
    var spinner = button.querySelector('.spinner-border');
    var buttonText = button.querySelector('.button-text');

    // Mostrar spinner y deshabilitar botón
    spinner.classList.remove('d-none');
    buttonText.textContent = 'Enviando...';
    button.disabled = true;

    // Simular envío del formulario
    setTimeout(function() {
        // Ocultar spinner y restaurar botón
        spinner.classList.add('d-none');
        buttonText.textContent = 'Enviar';
        button.disabled = false;

        // Simular envío exitoso
        alert("Formulario enviado con éxito");
        document.getElementById('venderForm').reset();
    }, 3000);
});