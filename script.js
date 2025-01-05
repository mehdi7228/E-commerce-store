// Initialize cart from localStorage or set to an empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// DOM Elements
const cartLink = document.querySelector('a[href="cart.html"]');
const categoryFilter = document.getElementById("category");
const productContainer = document.getElementById("product-container");
const dynamicProductsContainer = document.getElementById("dynamic-products-container");

function toggleMenu() {
  const nav = document.querySelector(".navbar nav");
  nav.classList.toggle("active");
}

// Update the cart count in the navbar
const updateCartCount = () => {
  if (cartLink) {
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartLink.textContent = `Cart (${totalItems})`;
  }
};

// Save cart to localStorage
const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
};

// Render cart items
const renderCart = () => {
  const cartItemsContainer = document.querySelector(".cart-items");
  const cartTotalElement = document.getElementById("cart-total");

  if (!cartItemsContainer || !cartTotalElement) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartTotalElement.textContent = "0.00";
    return;
  }

  cartItemsContainer.innerHTML = cart
    .map(
      (item, index) => `
        <div class="cart-item" data-index="${index}">
          <img src="${item.image}" alt="${item.name}">
          <div class="item-info">
            <h3>${item.name}</h3>
            <p class="unit-price">Price: $${item.price.toFixed(2)}</p>
          </div>
          <div class="item-actions">
            <label for="quantity-${index}">Quantity:</label>
            <input type="number" id="quantity-${index}" value="${item.quantity}" min="1" class="quantity">
            <button class="btn remove">Remove</button>
          </div>
          <div class="item-total">
            <p>Total: $<span class="item-total-price">${(item.price * item.quantity).toFixed(2)}</span></p>
          </div>
        </div>
      `
    )
    .join("");

  updateCartTotal();
};

// Update total cart price
const updateCartTotal = () => {
  const cartTotalElement = document.getElementById("cart-total");
  if (cartTotalElement) {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    cartTotalElement.textContent = total.toFixed(2);
  }
};

// Add product to cart
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart")) {
    const productCard = event.target.closest(".product-card");
    const originalPrice = parseFloat(productCard.getAttribute("data-price"));
    const discount = parseFloat(productCard.getAttribute("data-discount")) || 0;
    const finalPrice = discount > 0
      ? (originalPrice - (originalPrice * discount) / 100).toFixed(2)
      : originalPrice;

    const product = {
      id: productCard.getAttribute("data-id"),
      name: productCard.getAttribute("data-name"),
      price: parseFloat(finalPrice),
      originalPrice: originalPrice, 
      image: productCard.getAttribute("data-image"),
      quantity: 1,
    };

    // Check if the product already exists in the cart
    const existingProductIndex = cart.findIndex((item) => item.id === product.id);

    if (existingProductIndex !== -1) {
      // If the product is found, just increment the quantity
      cart.push({...product, quantity: 1}); // Add the same product again as a new item
    } else {
      // If the product does not exist, add it as a new item
      cart.push(product);
    }

    saveCart();
    alert("Product added to cart!");
  }
});

// Load cart from localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
    renderCart();
  }
});

// Load and render products from JSON
// در بخش بارگذاری محصولات (loadProducts) کد مربوط به دکمه View More را اصلاح کنید
const loadProducts = (url, container, cardClass, options = {}) => {
  const { applyDiscount = false } = options;

  const isIndexPage = window.location.pathname.includes("index.html");
  const isProductsPage = window.location.pathname.includes("products.html");

  fetch(url)
    .then((response) => response.json())
    .then((products) => {
      container.innerHTML = products
        .map((product) => {
          const originalPrice = product.price;
          const discount = product.discount || 0;
          const discountPrice = applyDiscount && discount > 0
            ? (originalPrice - (originalPrice * discount) / 100).toFixed(2)
            : null;

          // choose size
          const sizeOptions = product.sizes
            ? product.sizes
                .map((size) => `<option value="${size}">${size}</option>`)
                .join("")
            : null;

          return `
          <div class="${cardClass} ${applyDiscount && discount > 0 ? "discounted" : ""}" 
               data-category="${product.category}" 
               data-name="${product.name}" 
               data-price="${product.price}" 
               data-discount="${product.discount}" 
               data-image="${product.image}">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            
            <!-- Product description-->
            ${
              product.description
                ? `<p class="product-description">${product.description}</p>`
                : ""
            }

            <!-- size -->
            ${
              sizeOptions && isProductsPage
                ? `
                <label for="size-${product.name}">Size:</label>
                <select id="size-${product.name}" class="product-size">
                  ${sizeOptions}
                </select>
                `
                : ""
            }

            <!-- product price -->
            <div class="price">
              <p class="original-price">
                Price: <span>$${originalPrice}</span>
              </p>
              ${
                applyDiscount && discount > 0
                  ? `
                  <p class="discount-price">
                    Discount: <span>$${discountPrice}</span>
                  </p>
                  <p class="discount-percentage">
                    Save ${discount}%
                  </p>
                  `
                  : ""
              }
            </div>

            <!-- button -->
            
            ${
              isIndexPage
                ? `<a href="products.html" class="btn view-more">View More</a>`
                : isProductsPage
                ? `<button class="btn add-to-cart" data-id="${product.id}">
                    Add to Cart
                   </button>`
                : ""
            }
          </div>
          `;
        })
        .join("");
    })
    .catch((error) => console.error("Error loading products:", error));
};






// Load featured products on index.html with discount
if (productContainer) {
  loadProducts("products.json", productContainer, "featured-card", {
    discountPercentage: 20,
    applyDiscount: true,
  });
}

// Load all products on products.html without discount
if (dynamicProductsContainer) {
  loadProducts("all-products.json", dynamicProductsContainer, "product-card", {
    applyDiscount: true,
  });
}









// Category filtering
if (categoryFilter) {
  categoryFilter.addEventListener("change", () => {
    const selectedCategory = categoryFilter.value.toLowerCase();
    const allProductCards = document.querySelectorAll(".product-card");

    allProductCards.forEach((card) => {
      const category = card.dataset.category.toLowerCase();
      card.style.display =
        selectedCategory === "all" || category === selectedCategory
          ? "block"
          : "none";
    });
  });
}











// Render cart if on cart page
if (document.querySelector(".cart-items")) {
  renderCart();

  document.querySelector(".cart-items").addEventListener("input", (e) => {
    if (e.target.classList.contains("quantity")) {
      const index = e.target.closest(".cart-item").getAttribute("data-index");
      const newQuantity = parseInt(e.target.value, 10);
      cart[index].quantity = newQuantity > 0 ? newQuantity : 1;
      saveCart();
      renderCart();
    }
  });

  document.querySelector(".cart-items").addEventListener("click", (e) => {
    if (e.target.classList.contains("remove")) {
      const index = e.target.closest(".cart-item").getAttribute("data-index");
      cart.splice(index, 1);
      saveCart();
      renderCart();
    }
  });
}










// Checkout form submission
const checkoutForm = document.querySelector(".checkout-form");
if (checkoutForm) {
  checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(checkoutForm);
    const customerDetails = {};
    formData.forEach((value, key) => {
      customerDetails[key] = value;
    });

    localStorage.setItem("customerDetails", JSON.stringify(customerDetails));
    window.location.href = "confirm.html";
  });
}








// Confirmation page logic
document.addEventListener("DOMContentLoaded", () => {
  const orderDetailsDiv = document.getElementById("order-details");
  const backHomeBtn = document.getElementById("back-home");
  const customerDetails = JSON.parse(localStorage.getItem("customerDetails"));
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (customerDetails && orderDetailsDiv) {
    orderDetailsDiv.innerHTML = `
      <h2>Customer Details</h2>
      <p>Full Name: ${customerDetails.name}</p>
      <p>Email: ${customerDetails.email}</p>
      <p>Phone: ${customerDetails.phone}</p>
      <p>Address: ${customerDetails.address}</p>
      <h2>Order Summary</h2>
      <ul>
        ${cart
          .map(
            (item) => `
          <li>
            ${item.name} - $${item.price.toFixed(2)} x ${item.quantity} = $${(
              item.price * item.quantity
            ).toFixed(2)}
          </li>
        `
          )
          .join("")}
      </ul>
      <p><strong>Total: $${total.toFixed(2)}</strong></p>
    `;
  }

  if (backHomeBtn) {
    backHomeBtn.addEventListener("click", () => {
      localStorage.removeItem("cart");
      localStorage.removeItem("customerDetails");
      window.location.href = "index.html";
    });
  }
});

// Update cart count on load
document.addEventListener("DOMContentLoaded", updateCartCount);