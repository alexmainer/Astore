const productsContainer = document.getElementById('products-container');

const API_URL = 'http://localhost:3000/products';

const filterContainer = document.getElementById('filter-buttons');

async function loadCategories() {
    try {
        const res = await fetch('http://localhost:3000/categories');
        const categories = await res.json();

        filterContainer.innerHTML = '';

        // "All" button
        const allBtn = document.createElement('button');
        allBtn.textContent = 'All';
        allBtn.onclick = () => filterProducts('all', allBtn);
        filterContainer.appendChild(allBtn);

        // Dynamic category buttons
        categories.forEach(cat => {
            const btn = document.createElement('button');
            btn.textContent = cat.name;
            btn.onclick = () => filterProducts(cat.name.toLowerCase(), btn);
            filterContainer.appendChild(btn);
        });

    } catch (err) {
        console.error('Error loading categories:', err);
    }
}

async function fetchProducts() {
    try {
        const res = await fetch(API_URL);
        const products = await res.json();

        productsContainer.innerHTML = '';

        products.forEach(product => {
            const productCard = document.createElement('div');

            productCard.className = 'col-4 product-card';
            productCard.setAttribute('data-category', product.category.toLowerCase());

            productCard.innerHTML = `
                <a href="${product.externalLink}" class="product-image" target="_blank">
                    <img src="${product.imageUrl}" alt="${product.name}">
                </a>
                <h4>${product.name}</h4>
                <p>${product.description}</p>
            `;

            productsContainer.appendChild(productCard);
        });

    } catch (err) {
        console.error('Error fetching products:', err);
    }
}

fetchProducts();
function filterProducts(category, btn) {
    const products = document.querySelectorAll('.product-card');

    products.forEach(product => {
        const productCategory = product.getAttribute('data-category');

        if (category === 'all' || productCategory === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });

    // Highlight active button
    const buttons = document.querySelectorAll('.filter-buttons button');
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

loadCategories();