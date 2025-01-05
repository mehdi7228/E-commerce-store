# E-commerce Mini Store

This project is a functional and responsive e-commerce website. It includes features like dynamic product rendering, category filtering, an interactive shopping cart, and a checkout process. The site is built using **HTML**, **CSS**, and **JavaScript**, with data fetched from JSON files.

---

## Features

### 1. **Dynamic Product Rendering**  
- Products are fetched from JSON files (`products.json` and `all-products.json`) and dynamically rendered on the website.  
- Discounts and original prices are displayed for products where applicable.  

### 2. **Shopping Cart**  
- Users can add products to the cart with their respective quantities.  
- The cart is stored in `localStorage` to persist data between sessions.  
- Users can:
  - Update product quantities in the cart.  
  - Remove products from the cart.  
  - View a total price for the cart items.  

### 3. **Category Filtering**  
- Products can be filtered by category using a dropdown menu.  

### 4. **Checkout Process**  
- A checkout form collects customer details.  
- After form submission, the order summary and customer details are displayed on the confirmation page.  

### 5. **Responsive Design**  
- The website is fully responsive, ensuring a smooth experience across different devices.

---

## File Structure

### 1. **HTML Files**
- `index.html`: Displays featured products with discounts.  
- `products.html`: Displays all products with category filtering.  
- `cart.html`: Shows the shopping cart and allows users to update/remove items.  
- `checkout.html`: Contains a form for customer details.  
- `confirm.html`: Displays the order summary and customer details.  

### 2. **JavaScript Files**
- `script.js`: Contains all the main logic for dynamic product rendering, cart management, and checkout.  
- `app.js`: Ensures all scripts are loaded with `defer`.  

### 3. **JSON Files**
- `products.json`: Contains data for featured products.  
- `all-products.json`: Contains data for all products.

---

## How to Use

### 1. Clone the Repository
```bash
git clone <repository-url>
cd e-commerce-mini-store

2. Open the Project in Your Browser
	•	Simply open index.html in your browser to view the project.

3. Features Overview
	•	On the Home Page (index.html):
	•	View featured products with discounts.
	•	Navigate to the Products Page or Cart using the navbar.
	•	On the Products Page (products.html):
	•	Browse all products.
	•	Filter products by category.
	•	Add products to the cart.
	•	On the Cart Page (cart.html):
	•	View, update, or remove cart items.
	•	See the total price of cart items.
	•	Proceed to the checkout page.
	•	On the Checkout Page (checkout.html):
	•	Fill in customer details and submit the form.
	•	View the order summary on the confirmation page.

  Key Functions

updateCartCount()
	•	Updates the cart count in the navbar based on the total quantity of items in the cart.

saveCart()
	•	Saves the current state of the cart to localStorage.

renderCart()
	•	Renders the cart items on the cart page.

updateCartTotal()
	•	Calculates and updates the total price of items in the cart.

loadProducts(url, container, cardClass, options)
	•	Dynamically loads and renders products from a JSON file.

categoryFilter
	•	Filters displayed products based on the selected category.

  Dependencies
	•	localStorage: Used to store cart and customer details.
	•	Fetch API: For retrieving product data from JSON files.

  Improvements for Future Versions
	•	Add a backend to store cart and order data.
	•	Implement user authentication.
	•	Add payment gateway integration.
	•	Include more filtering options (e.g., price range, brand).
	•	Enhance animations for better user experience.

  Author

This project was developed by Mehdi KHodaie.