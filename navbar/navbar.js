document.addEventListener("DOMContentLoaded", function () {
    fetch("./StreamingSpartan/navbar/navbar.html") // Solicita el archivo navbar.html
        .then(response => response.text()) // Convierte la respuesta a texto
        .then(data => {
            let navbar = document.querySelector(".container"); // Busca por clase
            if (navbar) {
                navbar.innerHTML = data; // Inserta el contenido del navbar
            } else {
                console.error("No se encontró el contenedor del navbar.");
            }
        })
        .catch(error => console.error("Error al cargar el navbar:", error));
});

