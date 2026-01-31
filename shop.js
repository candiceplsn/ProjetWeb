// shop.js - Gestion des filtres et du tri de la boutique

// Tu pourras compléter ce fichier pour ajouter la logique des filtres et du tri

document.addEventListener('DOMContentLoaded', function() {
    
    // Sélection des éléments
    const filterCheckboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');
    const resetButton = document.getElementById('resetFilters');
    const sortSelect = document.getElementById('sortSelect');
    const productsGrid = document.getElementById('productsGrid');
    const productCount = document.getElementById('productCount');

    // Fonction pour filtrer les produits
    function filterProducts() {
        const products = document.querySelectorAll('.product-card');
        let visibleCount = 0;

        // Récupérer les filtres actifs
        const activeFilters = {
            type: Array.from(document.querySelectorAll('input[name="type"]:checked')).map(cb => cb.value),
            prix: Array.from(document.querySelectorAll('input[name="prix"]:checked')).map(cb => cb.value),
            annee: Array.from(document.querySelectorAll('input[name="annee"]:checked')).map(cb => cb.value)
        };

        products.forEach(product => {
            let shouldShow = true;

            // Filtrer par type
            if (activeFilters.type.length > 0) {
                const productType = product.dataset.type;
                if (!activeFilters.type.includes(productType)) {
                    shouldShow = false;
                }
            }

            // Filtrer par prix
            if (activeFilters.prix.length > 0 && shouldShow) {
                const productPrice = parseFloat(product.dataset.prix);
                let matchesPrice = false;

                activeFilters.prix.forEach(range => {
                    if (range === '0-15' && productPrice < 15) matchesPrice = true;
                    if (range === '15-30' && productPrice >= 15 && productPrice < 30) matchesPrice = true;
                    if (range === '30-50' && productPrice >= 30 && productPrice < 50) matchesPrice = true;
                    if (range === '50+' && productPrice >= 50) matchesPrice = true;
                });

                if (!matchesPrice) shouldShow = false;
            }

            // Filtrer par année
            if (activeFilters.annee.length > 0 && shouldShow) {
                const productYear = product.dataset.annee;
                if (!activeFilters.annee.includes(productYear)) {
                    shouldShow = false;
                }
            }

            // Afficher ou masquer le produit
            if (shouldShow) {
                product.style.display = 'block';
                visibleCount++;
            } else {
                product.style.display = 'none';
            }
        });

        // Mettre à jour le compteur
        productCount.textContent = visibleCount;
    }

    // Fonction pour trier les produits
    function sortProducts() {
        const products = Array.from(document.querySelectorAll('.product-card'));
        const sortValue = sortSelect.value;

        if (!sortValue) return;

        products.sort((a, b) => {
            switch (sortValue) {
                case 'prix-asc':
                    return parseFloat(a.dataset.prix) - parseFloat(b.dataset.prix);
                case 'prix-desc':
                    return parseFloat(b.dataset.prix) - parseFloat(a.dataset.prix);
                case 'nom':
                    const nameA = a.querySelector('.product-name').textContent;
                    const nameB = b.querySelector('.product-name').textContent;
                    return nameA.localeCompare(nameB);
                case 'annee':
                    return parseInt(b.dataset.annee) - parseInt(a.dataset.annee);
                default:
                    return 0;
            }
        });

        // Réorganiser les produits dans le DOM
        products.forEach(product => {
            productsGrid.appendChild(product);
        });
    }

    // Réinitialiser les filtres
    function resetFilters() {
        filterCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        sortSelect.value = '';
        filterProducts();
    }

    // Event listeners
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });

    resetButton.addEventListener('click', resetFilters);
    sortSelect.addEventListener('change', sortProducts);

    // Initialisation du compteur
    const initialCount = document.querySelectorAll('.product-card').length;
    productCount.textContent = initialCount;
});
