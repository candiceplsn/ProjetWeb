// map.js - Fichier pour la carte interactive

// Tu pourras intégrer ici une bibliothèque de cartographie comme Leaflet ou Google Maps
// Exemple avec Leaflet (à installer) :

/*
EXEMPLE D'INTÉGRATION AVEC LEAFLET :

1. Ajouter dans le <head> de carte.html :
   <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
   <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

2. Code d'initialisation :

document.addEventListener('DOMContentLoaded', function() {
    // Coordonnées du domaine (exemple : Nantes)
    const domaineCoords = [47.2184, -1.5536];
    
    // Initialiser la carte
    const map = L.map('map').setView(domaineCoords, 13);
    
    // Ajouter le fond de carte OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);
    
    // Marqueur pour le domaine principal
    const domaineMarker = L.marker(domaineCoords).addTo(map);
    domaineMarker.bindPopup('<b>Domaine des Vignes</b><br>Cave et boutique');
    
    // Marqueurs pour les parcelles
    const parcelles = [
        {
            coords: [47.2200, -1.5500],
            nom: 'Parcelle des Coteaux',
            type: 'rouge',
            description: '15 hectares - Cabernet Sauvignon, Merlot'
        },
        {
            coords: [47.2150, -1.5580],
            nom: 'Parcelle de la Vallée',
            type: 'blanc',
            description: '12 hectares - Chardonnay, Sauvignon Blanc'
        },
        {
            coords: [47.2220, -1.5450],
            nom: 'Parcelle du Plateau',
            type: 'rose',
            description: '8 hectares - Grenache, Cinsault'
        }
    ];
    
    // Couleurs selon le type
    const colors = {
        rouge: '#8b0000',
        blanc: '#f5f5dc',
        rose: '#ffb6c1'
    };
    
    // Ajouter les marqueurs des parcelles
    parcelles.forEach(parcelle => {
        const marker = L.circleMarker(parcelle.coords, {
            radius: 10,
            fillColor: colors[parcelle.type],
            color: '#000',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.7
        }).addTo(map);
        
        marker.bindPopup(`<b>${parcelle.nom}</b><br>${parcelle.description}`);
    });
});

*/

// Code de base pour remplacer le placeholder
document.addEventListener('DOMContentLoaded', function() {
    console.log('Carte prête à être initialisée');
    console.log('Intégrez votre solution de cartographie préférée ici');
    
    // Tu peux décommenter et adapter le code ci-dessus une fois Leaflet ajouté
});
