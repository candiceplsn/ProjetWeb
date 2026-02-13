// Gestion de la page de commande

let currentStep = 2;
let orderData = {
    delivery: {},
    payment: {},
    items: [],
    total: 0
};

document.addEventListener('DOMContentLoaded', function() {
    loadOrderSummary();
    updateProgressBar();
    setupPaymentMethodListener();
});

// Chargement du récap de commande
function loadOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        window.location.href = 'panier.html';
        return;
    }

    const orderRecap = document.getElementById('orderRecap');
    const summaryItems = document.getElementById('summaryItems');
    let subtotal = 0;

    orderRecap.innerHTML = '';
    summaryItems.innerHTML = '';

    cart.forEach(item => {
        const product = getProductById(item.id);
        if (product) {
            const itemTotal = parseFloat(product.price.replace(',', '.')) * item.quantity;
            subtotal += itemTotal;

            // Récapitulatif détaillé
            const recapItem = `
                <div class="recap-item">
                <div class="recap-icon"><img src="${product.icon}" alt="${product.type}" class="img-vin-panier"></div>
                    <div class="recap-info">
                        <div class="recap-name">${product.name}</div>
                        <div class="recap-details">Quantité: ${item.quantity} × ${product.price} €</div>
                    </div>
                    <div class="recap-total">${itemTotal.toFixed(2).replace('.', ',')} €</div>
                </div>
            `;
            orderRecap.innerHTML += recapItem;

            const summaryItem = `
                <div class="summary-item">
                    <span class="summary-item-name">${product.name} <small>(×${item.quantity})</small></span>
                    <span class="summary-item-price">${itemTotal.toFixed(2).replace('.', ',')} €</span>
                </div>
            `;
            summaryItems.innerHTML += summaryItem;

            orderData.items.push({
                id: product.id,
                name: product.name,
                quantity: item.quantity,
                price: parseFloat(product.price.replace(',', '.')),
                total: itemTotal
            });
        }
    });

    orderData.total = subtotal;
    updateTotals(subtotal, 0);
}

function updateTotals(subtotal, shippingCost) {
    const total = subtotal + shippingCost;
    
    document.getElementById('summarySubtotal').textContent = subtotal.toFixed(2).replace('.', ',') + ' €';
    document.getElementById('summaryShipping').textContent = shippingCost === 0 ? 'Gratuite' : shippingCost.toFixed(2).replace('.', ',') + ' €';
    document.getElementById('summaryTotal').textContent = total.toFixed(2).replace('.', ',') + ' €';
    
    orderData.total = total;
}

// Gestion de la barre de progression
function updateProgressBar() {
    document.querySelectorAll('.progress-step').forEach((step, index) => {
        const stepNum = parseInt(step.dataset.step);
        if (stepNum <= currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

function goToPayment() {
    const form = document.getElementById('deliveryForm');
    
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // Sauvegarde des données de livraison
    orderData.delivery = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        postalCode: document.getElementById('postalCode').value,
        city: document.getElementById('city').value,
        country: document.getElementById('country').value,
        notes: document.getElementById('deliveryNotes').value,
        method: document.querySelector('input[name="deliveryMethod"]:checked').value
    };

    const shippingCost = orderData.delivery.method === 'express' ? 9.90 : 0;
    updateTotals(orderData.items.reduce((sum, item) => sum + item.total, 0), shippingCost);

    document.getElementById('step-delivery').style.display = 'none';
    document.getElementById('step-payment').style.display = 'block';
    currentStep = 3;
    updateProgressBar();
    window.scrollTo(0, 0);
}

function goToDelivery() {
    document.getElementById('step-payment').style.display = 'none';
    document.getElementById('step-delivery').style.display = 'block';
    currentStep = 2;
    updateProgressBar();
    window.scrollTo(0, 0);
}

// Validation de la commande
function validateOrder() {
    const termsAccepted = document.getElementById('acceptTerms').checked;
    
    if (!termsAccepted) {
        alert('Veuillez accepter les conditions générales de vente pour continuer.');
        return;
    }

    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    // Pour la carte bancaire
    if (paymentMethod === 'card') {
        const cardNumber = document.getElementById('cardNumber').value;
        const cardExpiry = document.getElementById('cardExpiry').value;
        const cardCVV = document.getElementById('cardCVV').value;
        const cardName = document.getElementById('cardName').value;

        if (!cardNumber || !cardExpiry || !cardCVV || !cardName) {
            alert('Veuillez remplir tous les champs de paiement.');
            return;
        }
    }
    orderData.payment = {
        method: paymentMethod,
        timestamp: new Date().toISOString()
    };

    // Génération d'un numéro de commande
    const orderNumber = 'CMD' + Date.now().toString().slice(-8);
    document.getElementById('orderNumber').textContent = orderNumber;

    // Sauvegarde de la commande
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push({
        orderNumber: orderNumber,
        date: new Date().toISOString(),
        data: orderData
    });
    localStorage.setItem('orders', JSON.stringify(orders));

    // Vidage du panier
    localStorage.setItem('cart', JSON.stringify([]));
    updateBadges();
    document.getElementById('step-payment').style.display = 'none';
    document.getElementById('step-confirmation').style.display = 'block';
    currentStep = 4;
    updateProgressBar();
    window.scrollTo(0, 0);
}

document.addEventListener('DOMContentLoaded', function() {
    const deliveryRadios = document.querySelectorAll('input[name="deliveryMethod"]');
    deliveryRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const shippingCost = this.value === 'express' ? 9.90 : 0;
            const subtotal = orderData.items.reduce((sum, item) => sum + item.total, 0);
            updateTotals(subtotal, shippingCost);
        });
    });
});

function setupPaymentMethodListener() {
    const paymentRadios = document.querySelectorAll('input[name="paymentMethod"]');
    const cardForm = document.getElementById('cardPaymentForm');
    
    paymentRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'card') {
                cardForm.style.display = 'block';
            } else {
                cardForm.style.display = 'none';
            }
        });
    });
}
document.addEventListener('DOMContentLoaded', function() {
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });
    }

    const cardExpiryInput = document.getElementById('cardExpiry');
    if (cardExpiryInput) {
        cardExpiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            e.target.value = value;
        });
    }

    const cardCVVInput = document.getElementById('cardCVV');
    if (cardCVVInput) {
        cardCVVInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }
});
