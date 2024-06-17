function showDetails(itemId) {
    let details = {
        1: "Detalles del Artículo 1: Esta es un poleron de algodón de alta calidad.",
        2: "Detalles del Artículo 2: Este es un pantalón de mezclilla cómodo y moderno.",
        3: "Detalles del Artículo 3: Este es un poleron corto para cualquier ocasión.",
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
    if (quantity != null && !isNaN(quantity)) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let itemIndex = cart.findIndex(item => item.name === itemName);
        if (itemIndex > -1) {
            cart[itemIndex].quantity += Number(quantity);
        } else {
            cart.push({ name: itemName, price: price, quantity: Number(quantity), description: description });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        loadCartItems(); // Carga los artículos del carrito
        alert(`${itemName} ha sido agregado al carrito.`);
    }
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalQuantity = 0;
    for (let i = 0; i < cart.length; i++) {
        totalQuantity += cart[i].quantity;
    }
    document.getElementById("cart-count").innerText = totalQuantity;
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
    if (quantity != null && !isNaN(quantity)) {
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
    if (!validateEmail(email)) {
        alert("Por favor, ingresa un correo electrónico válido.");
        return false;
    }
    saveContact(name, email, message);
    alert("¡Gracias por tu mensaje!");
    return true;
}

function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
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

function calculateTotalPrice(price, quantity) {
    return price * quantity;
}

function displayCartItems() {
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
function clearCart() {
    // Vacía el carrito de compras
    localStorage.removeItem("cart");
    // Actualiza el contador del carrito y los artículos del carrito
    updateCartCount();
    loadCartItems();
}

// Función para guardar un contacto
function saveContact(name, email, message) {
    // Creación del objeto de contacto
    let contact = {
        name: name,
        email: email,
        message: message
    };

    // Guardado del contacto en el almacenamiento local
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    contacts.push(contact);
    localStorage.setItem("contacts", JSON.stringify(contacts));
}

// Función para obtener todos los contactos
function getContacts() {
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    return contacts;
}

// Función para actualizar un contacto
function updateContact(index, newContact) {
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    contacts[index] = newContact;
    localStorage.setItem("contacts", JSON.stringify(contacts));
}

// Función para eliminar un contacto
function deleteContact(index) {
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    contacts.splice(index, 1);
    localStorage.setItem("contacts", JSON.stringify(contacts));
}

loadCartItems();
updateCartCount(); // Actualiza el contador del carrito