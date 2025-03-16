document.addEventListener("DOMContentLoaded", () => {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || {};
    const cartContainer = document.getElementById("cart-items");
    const totalAmount = document.getElementById("total-amount");
    const buyButton = document.getElementById("buy-button");
    const whatsappButton = document.getElementById("whatsapp-button");
    const testButton = document.getElementById("test-button");
    const resetCartButton = document.getElementById("reset-cart");

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
                <p>${item.name} - $${item.price.toFixed(2)}</p>
                <div class="quantity-controls">
                    <button class="decrease" data-id="${id}" ${item.quantity === 1 ? "disabled" : ""}>-</button>
                    <span>${item.quantity}</span>
                    <button class="increase" data-id="${id}">+</button>
                </div>
                <button class="remove-item" data-id="${id}">Eliminar</button>
            `;
            cartContainer.appendChild(cartItem);

            total += item.price * item.quantity;
        });

        totalAmount.textContent = `Total: $${total.toFixed(2)}`;
        buyButton.disabled = false;
        whatsappButton.disabled = false;

        document.querySelectorAll(".increase").forEach(button => {
            button.addEventListener("click", (e) => {
                const productId = e.target.getAttribute("data-id");
                cartItems[productId].quantity++;
                localStorage.setItem("cart", JSON.stringify(cartItems));
                renderCart();
            });
        });

        document.querySelectorAll(".decrease").forEach(button => {
            button.addEventListener("click", (e) => {
                const productId = e.target.getAttribute("data-id");
                if (cartItems[productId].quantity > 1) {
                    cartItems[productId].quantity--;
                    localStorage.setItem("cart", JSON.stringify(cartItems));
                    renderCart();
                }
            });
        });

        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", (e) => {
                const productId = e.target.getAttribute("data-id");
                delete cartItems[productId];
                localStorage.setItem("cart", JSON.stringify(cartItems));
                renderCart();
            });
        });
    }

    function generateWhatsAppMessage() {
        let message = "Hola, me interesa comprar los siguientes productos:\n\n";
        let total = 0;

        Object.entries(cartItems).forEach(([id, item]) => {
            message += `- ${item.name} (x${item.quantity}): $${(item.price * item.quantity).toFixed(2)}\n`;
            total += item.price * item.quantity;
        });

        message += `\nTotal: $${total.toFixed(2)}\n\n¡Gracias!`;
        return message;
    }
    
    whatsappButton.addEventListener("click", () => {
        const message = generateWhatsAppMessage();
        const whatsappURL = `https://api.whatsapp.com/send?phone=541176302063&text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, "_blank");
    });

    resetCartButton.addEventListener("click", () => {
        cartItems = {};
        localStorage.removeItem("cart");
        renderCart();
    });

    renderCart();
});
