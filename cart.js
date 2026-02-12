// cart.js - Gestion du panier et des favoris avec localStorage

// Base de données de produits (à remplacer par une vraie base de données)
const productsDatabase = {
    1: {
        id: 1,
        name: "Château Rouge 2022",
        type: "Vin Rouge",
        price: "25,00",
        icon: "🍷",
        description: "Un rouge charpenté aux arômes de fruits noirs",
        year: 2022,
        alcohol: "13,5%",
        grape: "Cabernet Sauvignon, Merlot",
        service: "16-18°C",
        tastingNotes: "Nez complexe de fruits noirs mûrs, avec des notes de vanille et d'épices douces. En bouche, ce vin révèle une structure tannique élégante, avec une finale longue et persistante."
    },
    2: {
        id: 2,
        name: "Domaine Blanc 2023",
        type: "Vin Blanc",
        price: "18,00",
        icon: "🥂",
        description: "Fraîcheur et élégance pour ce blanc sec",
        year: 2023,
        alcohol: "12,5%",
        grape: "Chardonnay, Sauvignon Blanc",
        service: "8-10°C",
        tastingNotes: "Arômes floraux et d'agrumes frais. En bouche, une belle fraîcheur avec des notes minérales et une finale vive et persistante."
    },
    3: {
        id: 3,
        name: "Rosé d'Été 2023",
        type: "Vin Rosé",
        price: "15,00",
        icon: "🌸",
        description: "Léger et fruité, parfait pour l'été",
        year: 2023,
        alcohol: "12%",
        grape: "Grenache, Cinsault",
        service: "8-10°C",
        tastingNotes: "Nez de fruits rouges frais et de fleurs. Bouche ronde et gourmande, avec une belle acidité qui apporte de la fraîcheur."
    },
    4: {
        id: 4,
        name: "Grand Cru 2020",
        type: "Vin Rouge",
        price: "45,00",
        icon: "🍷",
        description: "Notre cuvée prestige, élevée en fût de chêne",
        year: 2020,
        alcohol: "14%",
        grape: "Cabernet Sauvignon",
        service: "16-18°C",
        tastingNotes: "Nez puissant et complexe de fruits noirs confits, de cuir et de tabac blond. Bouche ample et généreuse, avec des tanins soyeux et une finale exceptionnellement longue."
    },
    5: {
        id: 5,
        name: "Cuvée Prestige Blanc 2021",
        type: "Vin Blanc",
        price: "32,00",
        icon: "🥂",
        description: "Complexe et raffiné, idéal pour les grandes occasions",
        year: 2021,
        alcohol: "13%",
        grape: "Chardonnay",
        service: "10-12°C",
        tastingNotes: "Nez riche et complexe de fruits blancs mûrs, avec des notes beurrées et vanillées. En bouche, une texture crémeuse et une belle longueur."
    },
    6: {
        id: 6,
        name: "Terroir Rouge 2022",
        type: "Vin Rouge",
        price: "22,00",
        icon: "🍷",
        description: "Expression pure de notre terroir",
        year: 2022,
        alcohol: "13%",
        grape: "Merlot, Cabernet Franc",
        service: "14-16°C",
        tastingNotes: "Nez élégant de fruits rouges et d'épices. Bouche équilibrée avec des tanins fins et une belle fraîcheur en finale."
    }
};

// Récupérer un produit par son ID
function getProductById(id) {
    return productsDatabase[id] || null;
}

// ========================================
// GESTION DES FAVORIS
// ========================================

function toggleFavorite(productId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const index = favorites.indexOf(productId);
    
    if (index > -1) {
        // Retirer des favoris
        favorites.splice(index, 1);
    } else {
        // Ajouter aux favoris
        favorites.push(productId);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateBadges();
    updateFavoriteButtons();
    
    // Recharger la page favoris si on y est
    if (window.location.pathname.includes('favoris.html')) {
        loadFavorites();
    }
}

function updateFavoriteButtons() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    document.querySelectorAll('.fav-btn').forEach(btn => {
        const productCard = btn.closest('[data-id]');
        if (productCard) {
            const productId = parseInt(productCard.dataset.id);
            if (favorites.includes(productId)) {
                btn.innerHTML = '<img src="images/icone-coeur-rouge.png" alt="Favori ajouté">';
                btn.classList.add('active');
            } else {
                btn.innerHTML = '<img src="images/icone-coeur-blanc.png" alt="Ajouter aux favoris">';
                btn.classList.remove('active');
            }
        }
    });
}

// ========================================
// GESTION DU PANIER
// ========================================

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateBadges();
    
    // Animation de confirmation
    showNotification('Produit ajouté au panier !');
}

function showNotification(message) {
    // Créer une notification temporaire
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// ========================================
// MISE À JOUR DES BADGES
// ========================================

function updateBadges() {
    // Mettre à jour le badge des favoris
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favBadges = document.querySelectorAll('#favCount');
    favBadges.forEach(badge => {
        badge.textContent = favorites.length;
        badge.style.display = favorites.length > 0 ? 'inline-block' : 'none';
    });
    
    // Mettre à jour le badge du panier
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartBadges = document.querySelectorAll('#cartCount');
    cartBadges.forEach(badge => {
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'inline-block' : 'none';
    });
}

// ========================================
// INITIALISATION
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    updateBadges();
    updateFavoriteButtons();
});