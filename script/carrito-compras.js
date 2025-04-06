document.addEventListener("DOMContentLoaded", function () {
    let carrito = [];

    const combosDisponibles = [
        { id: 12, nombres: ["NETFLIX", "PRIME VIDEO", "DISNEY PLUS", "MAX"], precio: 31000 },
        { id: 1, nombres: ["NETFLIX", "MAX", "PRIME VIDEO"], precio: 20000 },
        { id: 2, nombres: ["NETFLIX", "MAX", "DISNEY PLUS"], precio: 26000 },
        { id: 3, nombres: ["NETFLIX", "PRIME VIDEO", "DISNEY PLUS"], precio: 26000 },
        { id: 4, nombres: ["PRIME VIDEO", "MAX", "DISNEY PLUS"], precio: 26000 },
        { id: 5, nombres: ["NETFLIX", "MAX"], precio: 17000 },
        { id: 6, nombres: ["NETFLIX", "PRIME VIDEO"], precio: 17000 },
        { id: 7, nombres: ["NETFLIX", "DISNEY PLUS"], precio: 22000 },
        { id: 8, nombres: ["NETFLIX", "PARAMOUNT PLUS"], precio: 17000 },
        { id: 9, nombres: ["DISNEY PLUS", "PRIME VIDEO"], precio: 16000 },
        { id: 10, nombres: ["DISNEY PLUS", "MAX"], precio: 16000 },
        { id: 11, nombres: ["PRIME VIDEO", "MAX"], precio: 10000 },
        { id: 13, nombres: ["PRIME VIDEO", "PARAMOUNT PLUS"], precio: 10000 }
        // Toca agregar más variaciones de combos 4-3-2
    ];

    function actualizarCarrito() {
        const listaCarrito = document.getElementById("listaCarrito");
        const totalCarrito = document.getElementById("totalCarrito");
        listaCarrito.innerHTML = "";

        let total = 0;
        let combosAplicados = [];
        let individuales = [];
        let carritoTemporal = [...carrito];

        let disponibles = {};
        carritoTemporal.forEach(p => {
            if (!disponibles[p.nombre]) disponibles[p.nombre] = [];
            for (let i = 0; i < p.cantidad; i++) {
                disponibles[p.nombre].push({
                    nombre: p.nombre,
                    precioUnitario: p.precioUnitario
                });
            }
        });

        combosDisponibles.forEach(combo => {
            let puedeFormarCombo = true;
            while (puedeFormarCombo) {
                puedeFormarCombo = combo.nombres.every(nombre => disponibles[nombre] && disponibles[nombre].length > 0);
                if (puedeFormarCombo) {
                    combo.nombres.forEach(nombre => disponibles[nombre].shift());
                    combosAplicados.push({ id: combo.id, nombres: combo.nombres, precio: combo.precio });
                    total += combo.precio;
                }
            }
        });

        // Guardar productos individuales restantes
        Object.keys(disponibles).forEach(nombre => {
            disponibles[nombre].forEach(p => individuales.push(p));
        });

        // Mostrar combos
        combosAplicados.forEach(combo => {
            const item = document.createElement("div");
            item.classList.add("item-carrito");
            item.innerHTML = `
                <p><strong>Combo ${combo.id}: ${combo.nombres.join(" + ")}</strong></p>
                <p>${combo.nombres.length} Plataformas</p>
                <p><strong>$${combo.precio.toLocaleString("es-CO")} COP</strong></p>
                <button class="eliminar-combo" data-combo="${combo.id}">❌</button>
            `;
            listaCarrito.appendChild(item);
        });

        // Mostrar individuales
        individuales.forEach((p, index) => {
            total += p.precioUnitario;
            const item = document.createElement("div");
            item.classList.add("item-carrito");
            item.innerHTML = `
                <p><strong>${p.nombre}</strong></p>
                <p>1 Pantalla</p>
                <p><strong>$${p.precioUnitario.toLocaleString("es-CO")} COP</strong></p>
                <button class="eliminar-item" data-nombre="${p.nombre}">❌</button>
            `;
            listaCarrito.appendChild(item);
        });

        totalCarrito.textContent = total.toLocaleString("es-CO");

        // Eliminar item individual
        document.querySelectorAll(".eliminar-item").forEach(boton => {
            boton.addEventListener("click", (e) => {
                const nombre = e.target.getAttribute("data-nombre");
                const index = carrito.findIndex(p => p.nombre === nombre);
                if (index !== -1) {
                    carrito.splice(index, 1);
                    actualizarCarrito();
                }
            });
        });

        // Eliminar combo
        document.querySelectorAll(".eliminar-combo").forEach(boton => {
            boton.addEventListener("click", (e) => {
                const comboId = parseInt(e.target.getAttribute("data-combo"));
                const combo = combosDisponibles.find(c => c.id === comboId);
                if (combo) {
                    combo.nombres.forEach(nombre => {
                        const idx = carrito.findIndex(p => p.nombre === nombre);
                        if (idx !== -1) {
                            carrito.splice(idx, 1);
                        }
                    });
                    actualizarCarrito();
                }
            });
        });
    }

    function agregarAlCarrito(event) {
        const contenedor = event.target.closest(".plataformas");
        const nombre = contenedor.querySelector(".name-plataforma").textContent.trim();
        const precio = parseInt(contenedor.querySelector("#value-plataform").textContent.replace(/[^\d]/g, ""));
        const cantidad = parseInt(contenedor.querySelector(".pantallas").value);

        const productoExistente = carrito.find(p => p.nombre === nombre);
        if (productoExistente) {
            productoExistente.cantidad += cantidad;
            productoExistente.precioTotal += precio * cantidad;
        } else {
            carrito.push({
                nombre,
                cantidad,
                precioUnitario: precio,
                precioTotal: precio * cantidad
            });
        }

        actualizarCarrito();
        mostrarMensajeAgregado();
        document.getElementById("carrito").scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function vaciarCarrito() {
        carrito = [];
        actualizarCarrito();
    }

    // Eventos
    document.querySelectorAll("#button-buy").forEach(btn => {
        btn.addEventListener("click", agregarAlCarrito);
    });

    document.getElementById("vaciarCarrito").addEventListener("click", vaciarCarrito);

    function mostrarMensajeAgregado() {
        const mensaje = document.getElementById("mensajeAgregado");
        mensaje.style.display = "block";
        setTimeout(() => {
            mensaje.style.display = "none";
        }, 2000);
    }
});
