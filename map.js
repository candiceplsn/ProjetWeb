document.addEventListener('DOMContentLoaded', function() {
    // 1. Équilibrage du centre : on remonte un peu vers le nord par rapport au test précédent
    // mais on reste assez bas pour garder la Corse.
    const centreVue = [46.20, 2.20]; 
    
    const map = L.map('map', {
        center: centreVue,
        zoom: 5.5, // Zoom légèrement réduit pour garantir que le haut et le bas rentrent
        zoomControl: false,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        touchZoom: false,
        boxZoom: false,
        keyboard: false,
        // Empêche la carte de rebondir ou de bouger
        maxBoundsViscosity: 1.0 
    });

    // Fond de carte clair
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    // 2. Les 14 régions avec les couleurs de votre image
    const regionsViticoles = [
        { name: "Languedoc", coords: [43.40, 3.20], color: "#611C35", radius: 55000, desc: "Plus grand vignoble de France, offrant des vins généreux entre mer et garrigue." },
        { name: "Roussillon", coords: [42.75, 2.75], color: "#7B1E3A", radius: 30000, desc: "Terre de Vins Doux Naturels et de rouges puissants au pied des Pyrénées." },
        { name: "Bordeaux", coords: [44.84, -0.40], color: "#80273C", radius: 60000, desc: "Référence mondiale pour les grands crus rouges charpentés et blancs liquoreux." },
        { name: "Loire", coords: [47.30, 0.70], color: "#852F3D", radius: 85000, desc: "Grande diversité de blancs frais et rouges légers. S'étend de l'Atlantique au Centre." },
        { name: "Rhône", coords: [44.80, 4.90], color: "#8F3F3F", radius: 65000, desc: "Vins puissants et ensoleillés. Berceau de la Syrah et du Grenache." },
        { name: "Sud-Ouest", coords: [44.00, 1.20], color: "#995042", radius: 65000, desc: "Une mosaïque de vignobles offrant des vins de caractère comme le Cahors ou le Madiran." },
        { name: "Bourgogne", coords: [47.15, 4.80], color: "#A36145", radius: 50000, desc: "Le royaume du Pinot Noir et du Chardonnay. Terroir de climats classés à l'UNESCO." },
        { name: "Champagne", coords: [49.10, 4.00], color: "#AC7147", radius: 55000, desc: "Célèbre pour ses vins effervescents prestigieux. Cépages : Chardonnay, Pinot Noir et Meunier." },
        { name: "Provence", coords: [43.50, 6.20], color: "#B17948", radius: 55000, desc: "Le spécialiste mondial des vins rosés élégants, frais et fruités." },
        { name: "Alsace", coords: [48.30, 7.40], color: "#B68149", radius: 45000, desc: "Vins blancs aromatiques (Riesling, Gewurztraminer). Une route des vins mythique." },
        { name: "Beaujolais", coords: [46.10, 4.70], color: "#BB8A4A", radius: 25000, desc: "Vins rouges fruités issus du cépage Gamay, connus pour leur convivialité." },
        { name: "Corse", coords: [42.15, 9.10], color: "#C0924B", radius: 60000, desc: "Vins de l'Île de Beauté aux cépages uniques comme le Niellucciu et le Sciaccarellu." },
        { name: "Savoie", coords: [45.65, 6.10], color: "#C59A4C", radius: 35000, desc: "Vins de montagne frais et minéraux, parfaits pour accompagner la gastronomie locale." },
        { name: "Jura", coords: [46.70, 5.55], color: "#C9A24D", radius: 25000, desc: "Vins de caractère, dont le célèbre Vin Jaune et le Vin de Paille." },
    ];

    const legendContainer = document.getElementById('js-legend');
    const infoPanel = document.getElementById('region-info');
    const infoTitle = document.getElementById('info-title');
    const infoContent = document.getElementById('info-content');

    // 3. Création des zones interactives
    regionsViticoles.forEach(region => {
        const circle = L.circle(region.coords, {
            color: region.color,
            fillColor: region.color,
            fillOpacity: 0.7,
            weight: 1,
            radius: region.radius
        }).addTo(map);

        // Tooltip au survol
        circle.bindTooltip(region.name, { direction: "top", sticky: true });

        // Clic pour afficher les détails
        circle.on('click', function() {
            if(infoPanel) {
                infoPanel.style.display = 'block';
                infoPanel.style.borderLeftColor = region.color;
                infoTitle.innerText = region.name;
                infoTitle.style.color = region.color;
                infoContent.innerText = region.desc;
                infoPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });

        // Effets visuels
        circle.on('mouseover', function() { this.setStyle({ fillOpacity: 0.9, weight: 2 }); });
        circle.on('mouseout', function() { this.setStyle({ fillOpacity: 0.7, weight: 1 }); });

        // 4. Légende dynamique
        if(legendContainer) {
            const item = document.createElement('div');
            item.className = 'legend-item';
            item.style.cursor = 'pointer';
            item.innerHTML = `<span class="dot" style="background:${region.color}"></span> ${region.name}`;
            item.onclick = () => circle.fire('click');
            legendContainer.appendChild(item);
        }
    });
});