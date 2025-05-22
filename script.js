// Глобальные переменные
let allProducts = [];
const apiBaseUrl = 'http://91.186.198.90:3005/api/products';
const productsContainer = document.getElementById('productsContainer');
const modal = document.getElementById('productModal');
const modalBody = document.getElementById('modalBody');
const closeButton = document.querySelector('.close-button');

// Загрузка товаров при загрузке страницы
fetchProducts();

// Закрытие модального окна
closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Закрытие модального окна при клике вне его
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
// Получение товаров с сервера
async function fetchProducts() {
    try {
        const response = await fetch(apiBaseUrl);
        
        if (!response.ok) {
            console.log('Не удалось загрузить товары');
        }
        
        const data = await response.json();
        allProducts = data.products;
        
        if (allProducts.length > 0) {
            renderProducts(allProducts);
        }
    } catch (error) {
        console.error('Ошибка при загрузке товаров:', error);
    }
}

// Отображение товаров
function renderProducts(products) {
    productsContainer.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image_url}" alt="" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">${formatPrice(product.price)} ₽</p>
                <p class="product-description">${product.description }</p>
            </div>
        `;
        
        // Открытие модального окна при клике на карточку товара
        productCard.addEventListener('click', () => {
            openProductModal(product);
        });
        
        productsContainer.appendChild(productCard);
    });
}

// Открытие модального окна с информацией о товаре
function openProductModal(product) {
    modalBody.innerHTML = `
        <div class="modal-product">
            <img src="${product.image_url}" alt="${product.name}" class="modal-product-image" onerror="this.src='https://via.placeholder.com/400x400?text=Нет+изображения'">
            <div class="modal-product-info">
                <h2>${product.name}</h2>
                <p class="modal-product-price">${formatPrice(product.price)} ₽</p>
                <p class="modal-product-description">${product.description}</p>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Форматирование цены
function formatPrice(price) {
    return parseFloat(price).toLocaleString('ru-RU', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}