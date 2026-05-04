// admin.js
let allProducts = [];
// DOM elements
const categorySelect = document.getElementById('category');
const productForm = document.getElementById('productForm');
const productsDiv = document.getElementById('products');

const API_BASE = 'http://localhost:3000';
const categoryForm = document.getElementById('categoryForm');
const categoryListDiv = document.getElementById('categoryList');

const ADMIN_PASSWORD = "0110"; // change this later

function lockAdmin() {
    const entered = prompt("Enter Admin Password:");

    if (entered !== ADMIN_PASSWORD) {
        alert("Access Denied");
        document.body.innerHTML = "<h1>Unauthorized Access</h1>";
    }
}



categoryForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('categoryName').value;

    try {
        await fetch('http://localhost:3000/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name })
        });

        categoryForm.reset();

        // refresh categories dropdown
        fetchCategories();
        loadCategories(); // homepage buttons if open

    } catch (err) {
        console.error('Error adding category:', err);
    }
});

async function loadAdminCategories() {
    try {
        const res = await fetch('http://localhost:3000/categories');
        const categories = await res.json();

        categoryListDiv.innerHTML = '';

        categories.forEach(cat => {
            const div = document.createElement('div');

            div.innerHTML = `
                <span>${cat.name}</span>
                <button onclick="deleteCategory('${cat._id}')">Delete</button>
            `;

            categoryListDiv.appendChild(div);
        });

    } catch (err) {
        console.error('Error loading categories:', err);
    }
}

// Fetch categories and populate dropdown
async function fetchCategories() {
    try {
        const res = await fetch(`${API_BASE}/categories`);
        const categories = await res.json();
        

        categorySelect.innerHTML = ''; // clear existing options
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.name; // we use category name
            option.textContent = cat.name;
            categorySelect.appendChild(option);
        });
    } catch (err) {
        console.error('Error fetching categories:', err);
    }
}

// Delete Categories
async function deleteCategory(id) {
    try {
        await fetch(`http://localhost:3000/categories/${id}`, {
            method: 'DELETE'
        });

        loadAdminCategories(); // refresh list

        // also refresh dropdown + homepage buttons
        fetchCategories();
        loadCategories();

    } catch (err) {
        console.error('Error deleting category:', err);
    }
}

// Fetch products and display
async function fetchProducts() {
    try {
        const res = await fetch(`${API_BASE}/products`);
        const products = await res.json();

        productsDiv.innerHTML = ''; // clear previous

        products.forEach(prod => {
            const div = document.createElement('div');
            div.className = 'product-admin-card';

            div.innerHTML = `
                <img src="${prod.imageUrl}" alt="${prod.name}" />

                <div class="product-info">
                    <strong>${prod.name}</strong><br>
                    <small>${prod.category}</small><br>
                    
                    <a href="${prod.externalLink}" target="_blank">View Product</a>
                </div>

                <div>
                    <button onclick="deleteProduct('${prod._id}')">Delete</button>
                </div>
            `;

            productsDiv.appendChild(div);
        });

    } catch (err) {
        console.error('Error fetching products:', err);
    }
}

// Handle form submission
productForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('name', document.getElementById('name').value);
    formData.append('description', document.getElementById('description').value);
    formData.append('subDescription', document.getElementById('subDescription').value);
    formData.append('category', categorySelect.value);
    formData.append('externalLink', document.getElementById('externalLink').value);

    // image file
    formData.append('image', document.getElementById('image').files[0]);

    try {
        await fetch(`${API_BASE}/products`, {
            method: 'POST',
            body: formData
        });

        productForm.reset();
        fetchProducts(); // refresh list

    } catch (err) {
        console.error('Error adding product:', err);
    }
});

// Delete product
async function deleteProduct(id) {
    try {
        await fetch(`${API_BASE}/products/${id}`, { method: 'DELETE' });
        fetchProducts(); // refresh list
    } catch (err) {
        console.error('Error deleting product:', err);
    }
}


loadAdminCategories();

// Initial load
fetchCategories();
fetchProducts();
lockAdmin();