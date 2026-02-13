//Gestion de la page détail produit

let currentProductId = null;

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    currentProductId = parseInt(urlParams.get('id'));
    
    if (currentProductId) {
        loadProductDetail(currentProductId);
        loadSuggestions(currentProductId);
    } else {
        window.location.href = 'boutique.html';
    }
});

function loadProductDetail(productId) {
    const product = getProductById(productId);
    
    if (!product) {
        window.location.href = 'boutique.html';
        return;
    }
    
    document.title = `${product.name} - Domaine des Vignes`;
    
    // Infos du produit
    document.getElementById('breadcrumbProduct').textContent = product.name;
    const img = document.createElement("img");
    img.src = product.icon;
    img.classList.add("img-vins-detail");

    const productImageMain = document.getElementById('productImageMain');
    productImageMain.innerHTML = "";
    productImageMain.appendChild(img);

    document.getElementById('productName').textContent = product.name;
    document.getElementById('productType').textContent = product.type;
    document.getElementById('productPrice').textContent = product.price + ' €';
    document.getElementById('productDescription').textContent = product.description;
    document.getElementById('productYear').textContent = product.year;
    document.getElementById('productAlcohol').textContent = product.alcohol;
    document.getElementById('productGrape').textContent = product.grape;
    document.getElementById('productService').textContent = product.service;
    document.getElementById('productTastingNotes').textContent = product.tastingNotes;
    
    updateFavoriteButtonDetail();
}

function updateFavoriteButtonDetail() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favButton = document.getElementById('favButtonLarge');
   
    if (favorites.includes(currentProductId)) {
        favButton.innerHTML = '<img src="images/icone-coeur-rouge.png" alt="Favori ajouté">';
        favButton.classList.add('active');
    } else {
        favButton.innerHTML = '<img src="images/icone-coeur-blanc.png" alt="Ajouter aux favoris">';
        favButton.classList.remove('active');
    }
}

function toggleFavoriteDetail() {
    toggleFavorite(currentProductId);
    updateFavoriteButtonDetail();
}

function changeQuantity(change) {
    const quantityInput = document.getElementById('quantity');
    let newValue = parseInt(quantityInput.value) + change;
    
    if (newValue < 1) newValue = 1;
    if (newValue > 99) newValue = 99;
    
    quantityInput.value = newValue;
}

function addToCartFromDetail() {
    const quantity = parseInt(document.getElementById('quantity').value);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === currentProductId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ id: currentProductId, quantity: quantity });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateBadges();
    
    // Notification
    showNotification(`${quantity} bouteille${quantity > 1 ? 's' : ''} ajoutée${quantity > 1 ? 's' : ''} au panier !`);
}

function loadSuggestions(currentProductId) {
    const currentProduct = getProductById(currentProductId);
    const suggestionsGrid = document.getElementById('suggestionsGrid');
    
    if (!currentProduct || !suggestionsGrid) return;
    
    // Trouve des produits du même type
    const allProducts = Object.values(productsDatabase);
    const suggestions = allProducts
        .filter(p => p.id !== currentProductId && p.type === currentProduct.type)
        .slice(0, 3);
    
    if (suggestions.length === 0) {
        // Si pas de produits du même type, prendre des produits aléatoires
        suggestions.push(...allProducts.filter(p => p.id !== currentProductId).slice(0, 3));
    }
    
    suggestionsGrid.innerHTML = '';
    
    suggestions.forEach(product => {
        const productCard = `
            <div class="product-card" data-id="${product.id}">
                <button class="fav-btn" onclick="toggleFavorite(${product.id})"></button>
                <a href="produit.html?id=${product.id}" class="product-link">
                    <div class="product-image"><img src="${product.icon}" alt="${product.type}" class="img-vin-suggestion"></div>
                    <div class="product-info">
                        <h3 class="product-name">${product.name}</h3>
                        <p class="product-type">${product.type}</p>
                        <p class="product-description">${product.description}</p>
                        <div class="product-footer">
                            <span class="product-price">${product.price} €</span>
                        </div>
                    </div>
                </a>
                <button class="btn btn-small btn-add-cart" onclick="addToCart(${product.id})">Ajouter au panier</button>
            </div>
        `;
        suggestionsGrid.innerHTML += productCard;
    });
    
    updateFavoriteButtons();
}
