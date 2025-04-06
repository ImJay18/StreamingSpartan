// BORRADOR SIN ASIGNACIÓN PUNTUAL, AJUSTAR AL FORMATO

let paises = [
    {codigo: 1, nombre: "Colombia"},
    {codigo: 2, nombre: "Brasil"},
    {codigo: 3, nombre: "Peru"}
]

let ciudades = [
    {codigo: 1, nombre: "Cartagena", codigo_pais: 1},
    {codigo: 2, nombre: "Barranquilla", codigo_pais: 1},
    {codigo: 3, nombre: "Santa Marta", codigo_pais: 1},
f]

function show(){ /* Mostrar el formulario */
    document.getElementById("Aplica-ya").style.display = "flex"

    // Bajar a sección con el scroll lentamente
    document.getElementById("Aplica-ya").scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    })
}

function hide(){ /* Ocultar el formulario */
    document.getElementById("Aplica-ya").style.display = "none"
}

let = data;

function send(event){
    event.preventDefault()

    data.push({
        nombre: document.getElementById("nombre").value,
        apellidos: document.getElementById("apellidos").value,
        correo: document.getElementById("correo").value,
        telefono: document.etElementById("telefono").value,
        pais: document.getElementById("pais").value
    })

    document.getElementById("MyFormulario").reset()

    console.log(datas)
    return false
}


function toggleSelector(button) {
    const card = button.closest(".plataformas"); // Encuentra la tarjeta actual
    const selector = card.querySelector(".selector-pantallas"); // Encuentra el selector dentro de la tarjeta
    const buyButton = card.querySelector("#button-buy"); // Encuentra el botón dentro de la tarjeta

    if (selector.style.display === "flex") {
        selector.style.display = "none";
        buyButton.innerHTML = "Comprar";
    } else {
        // Cerrar todos los selectores antes de abrir uno nuevo
        document.querySelectorAll(".selector-pantallas").forEach(sel => sel.style.display = "none");
        document.querySelectorAll("#button-buy").forEach(btn => btn.innerHTML = "Comprar");

        selector.style.display = "flex";
        buyButton.innerHTML = "Agregar 🛒";
    }
}

function cambiarPantallas(button, cambio) {
    let input = button.parentElement.querySelector(".pantallas");
    let valorActual = parseInt(input.value);
    let nuevoValor = valorActual + cambio;

    if (nuevoValor >= 1) {
        input.value = nuevoValor;
    }

    if (nuevoValor > 10){
        input.value = valorActual
    }
}
