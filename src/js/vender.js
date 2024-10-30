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


// funcion del spinner
document.getElementById('venderForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Disable the submit button and show the spinner
    document.getElementById('submitBtn').disabled = true;
    document.getElementById('spinner').classList.remove('d-none');
  
    // Simulate a delay before hiding the spinner and enabling the submit button
    setTimeout(function() {
      document.getElementById('submitBtn').disabled = false;
      document.getElementById('spinner').classList.add('d-none');
    }, 2000);
  });
  
