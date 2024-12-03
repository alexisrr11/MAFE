document.addEventListener("DOMContentLoaded", () => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || {};

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", (e) => {
            const product = e.target.parentElement;
            const productId = product.getAttribute("data-id");
            const productName = product.getAttribute("data-name");
            const productPrice = parseFloat(product.getAttribute("data-price"));

            if (cartItems[productId]) {
                cartItems[productId].quantity++;
            } else {
                cartItems[productId] = { name: productName, price: productPrice, quantity: 1 };
            }

            localStorage.setItem("cart", JSON.stringify(cartItems));
            alert(`${productName} agregado al carrito`);
        });
    });
});



const ul = document.querySelector("#ul");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
    ul.classList.add("visible");
})

cerrar.addEventListener("click", () => {
    ul.classList.remove("visible");
})



let hideText_btn = document.getElementById("hideText_btn");
let hideText = document.getElementById("hideText");

hideText_btn.addEventListener("click", ToggleText);

function ToggleText() {
    hideText.classList.toggle("show");
}

hideText.addEventListener("click", () => {
    hideText.classList.remove("show");
})

document.querySelectorAll('.slider-container').forEach((container) => {
    const slider = container.querySelector('.slider');
    const prevButton = container.querySelector('.prev');
    const nextButton = container.querySelector('.next');

    let currentIndex = 0;

    const updateSlider = () => {
        const slideWidth = slider.clientWidth;
        slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === slider.children.length - 1;
    };

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < slider.children.length - 1) {
            currentIndex++;
            updateSlider();
        }
    });

    window.addEventListener('resize', updateSlider);
    updateSlider(); // Inicializa el estado del slider
});

