document.addEventListener("DOMContentLoaded", () => {
    // Cargar los productos del carrito desde el localStorage
    let cartItems = JSON.parse(localStorage.getItem("cart")) || {};
    const cartContainer = document.getElementById("cart-items");
    const totalAmount = document.getElementById("total-amount");
    const buyButton = document.getElementById("buy-button");
    const whatsappButton = document.getElementById("whatsapp-button");
    const testButton = document.getElementById("test-button");

    // Función para renderizar el carrito
    function renderCart() {
        cartContainer.innerHTML = "";

        if (Object.keys(cartItems).length === 0) {
            cartContainer.innerHTML = "<p>El carrito está vacío</p>";
            totalAmount.textContent = "Total: $0.00";
            buyButton.disabled = true;
            whatsappButton.disabled = true;
            return;
        }

        let total = 0;

        Object.entries(cartItems).forEach(([id, item]) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <p>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</p>
                <button class="remove-item" data-id="${id}">Eliminar</button>
            `;
            cartContainer.appendChild(cartItem);

            total += item.price * item.quantity;
        });

        totalAmount.textContent = `Total: $${total.toFixed(2)}`;
        buyButton.disabled = false;
        whatsappButton.disabled = false;

        // Añadir funcionalidad para eliminar productos
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", (e) => {
                const productId = e.target.getAttribute("data-id");
                delete cartItems[productId];
                localStorage.setItem("cart", JSON.stringify(cartItems));
                renderCart();
            });
        });
    }

    // Función para generar el mensaje de WhatsApp
    function generateWhatsAppMessage() {
        let message = "Hola, me interesa comprar los siguientes productos:\n\n";
        let total = 0;

        Object.entries(cartItems).forEach(([id, item]) => {
            message += `- ${item.name} (x${item.quantity}): $${(item.price * item.quantity).toFixed(2)}\n\n`;
            total += item.price * item.quantity;
        });

        message += `\nTotal: $${total.toFixed(2)}\n\n¡Gracias!`;
        return message;
    }
    

    // Evento para el botón de WhatsApp
    whatsappButton.addEventListener("click", () => {
        const message = generateWhatsAppMessage();
        const whatsappURL = `https://api.whatsapp.com/send?phone=541176302063&text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, "_blank");
    });

    // Evento para el botón de compra
    buyButton.addEventListener("click", () => {
        alert(`¡Gracias por tu compra! El total fue $${totalAmount.textContent.split("$")[1]}`);
        localStorage.removeItem("cart");
        cartItems = {}; // Vaciar el carrito
        renderCart();
    });

    // Generar productos de prueba (100 productos)
    testButton.addEventListener("click", () => {
        for (let i = 1; i <= 100; i++) {
            cartItems[i] = {
                name: `Producto ${i}`,
                price: Math.random() * 100,
                quantity: Math.floor(Math.random() * 5) + 1,
            };
        }
        localStorage.setItem("cart", JSON.stringify(cartItems));
        renderCart();
    });

    // Llamada inicial para renderizar el carrito al cargar la página
    renderCart();
});
