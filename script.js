function showDetails(itemId) {
    let details = {
        1: "Detalles del Artículo 1: Esta es una camiseta de algodón de alta calidad.",
        2: "Detalles del Artículo 2: Este es un pantalón de mezclilla cómodo y moderno.",
        3: "Detalles del Artículo 3: Esta es un poleron corto para cualquier ocasión.",
        4: "Detalles del Artículo 4: Este es un vestido de temporada cómodo y fresco."
    };
    document.getElementById("modal-text").innerText = details[itemId];
    document.getElementById("modal").style.display = "block";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

function addToCart(event, itemName, price, description) {
    event.stopPropagation();
    let quantity = prompt("¿Cuántos quieres agregar al carrito?", "1");
    if (quantity != null) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let itemIndex = cart.findIndex(item => item.name === itemName);
        if (itemIndex > -1) {
            // El producto ya está en el carrito, actualiza la cantidad
            cart[itemIndex].quantity += Number(quantity);
        } else {
            // El producto no está en el carrito, añádelo
            cart.push({ name: itemName, price: price, quantity: Number(quantity), description: description });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        alert(`${itemName} ha sido agregado al carrito.`);
    }
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").innerText = cart.length;
}

function loadCartItems() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
        let itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");
        itemDiv.innerHTML = `
            <p>${item.name} - $${item.price} x ${item.quantity}</p>
            <p>${item.description}</p>
            <button onclick="removeFromCart(${index})">Eliminar</button>
            <button onclick="updateQuantity(${index})">Actualizar cantidad</button>
        `;
        cartItems.appendChild(itemDiv);
        total += item.price * item.quantity;
    });
    document.getElementById("cart-total").innerText = `Total: $${total}`;
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    loadCartItems();
}

function updateQuantity(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let quantity = prompt("Ingresa la nueva cantidad", cart[index].quantity);
    if (quantity != null) {
        cart[index].quantity = Number(quantity);
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCartItems();
    }
}

function toggleCart() {
    let cart = document.getElementById("cart");
    cart.style.display = cart.style.display === "block" ? "none" : "block";
}

function checkout() {
    alert("¡Gracias por tu compra!");
    localStorage.removeItem("cart");
    updateCartCount();
    loadCartItems();
    toggleCart();
}

function validateForm() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;
    if (name === "" || email === "" || message === "") {
        alert("Todos los campos son obligatorios.");
        return false;
    }
    alert("¡Gracias por tu mensaje!");
    return true;
}

function filterProducts() {
    let category = document.getElementById("category").value;
    let products = document.querySelectorAll(".gallery-item");
    products.forEach(product => {
        if (category === "all" || product.dataset.category === category) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}
