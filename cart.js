function updateBadges() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    document.querySelectorAll('#favCount').forEach(b => b.textContent = favorites.length);
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('#cartCount').forEach(b => b.textContent = total);
}
document.addEventListener('DOMContentLoaded', updateBadges);