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
        { name: "Languedoc", coords: [43.40, 3.20], color: "#611C35", radius: 55000, desc: "Sur la pointe sud de l'hexagone, autour du golfe du Lion, s'étire un vignoble qui est en volume le premier de France : oui, nous parlons bien du Languedoc, avec ses 200 000 hectares de vigne plantée sous un climat hautement favorable. Beaucoup de vins de table, certes, mais aussi de nombreux vins de qualité, dont les AOC rassemblent 36 000 hectares, soit tout de même une Bourgogne et demie ! Le Languedoc excelle notamment dans les muscats (de Frontignan, de Mireval, de Lunel et de Saint-Jean-de-Minervois), ces vins doux naturels obtenus par mutage. On sait moins souvent qu'il abrite aussi le doyen mondial des vins effervescents : la Blanquette de Limoux, élaborée dès 1531 par les moines de l'Abbaye de St-Hilaire. Depuis les années 1980, c'est aussi l'un des hauts lieux du retour en grâce des vins de cépage, autour du grenache, du mourvèdre et de la syrah. Autant de raisons d'étancher sa soif et sa curiosité en découvrant ou redécouvrant ce vignoble des plus attachants !" },
        { name: "Roussillon", coords: [42.75, 2.75], color: "#7B1E3A", radius: 30000, desc: "Dans le monde des vins mutés, le Roussillon est une superpuissance : il assure à lui seul 80% de la production française. Banyuls, Maury, Rivesaltes : le paradis des vins doux naturels mérite bien une pause... d'autant qu'il réserve beaucoup d'autres surprises ! Sous un ensoleillement exceptionnel, le département des Pyrénées-Orientales abrite pas moins de treize appellations, plantées sur la pointe sud de l'Hexagone. Bordé à l'est par la Méditerranée, au sud par le massif du Canigou et par celui des Corbières au nord, ce terroir abrite des sols très variés, dont l'unité ne se retrouve guère qu'au niveau de l'appellation. Le climat, lui, est partout chaud et sec, à l'exception d'une saison automnale relativement pluvieuse. C'est dans l'ensemble un vignoble très sain, d'autant plus qu'y soufflent des vents forts et réguliers." },
        { name: "Bordeaux", coords: [44.84, -0.40], color: "#80273C", radius: 60000, desc: `Bordeaux... peut-être le terroir le plus admiré et le plus imité dans le monde, et sans conteste sa capitale mondiale. Cela fait maintenant huit siècles qu'elle a lié sa gloire au commerce du vin – depuis la prise de La Rochelle par les troupes anglaises, qui dévia sur Bordeaux la tête de pont du commerce atlantique en matière de vin. Dans la région, les vignes elles-mêmes sont d'ailleurs beaucoup plus anciennes – le poète romain Ausone, consul à Burdigala au IVème siècle, aurait déjà possédé un domaine aux abords de Saint-Emilion. 
            De l'excellence à l'arrogance, de la perfection à la froideur et de la tradition à l'austérité, les compliments qu'on adresse souvent à Bordeaux ne sont jamais loin du reproche – inévitable rançon d'une primauté connue de tous. Sa position singulière est le produit d'une conjonction exceptionnelle du climat, du paysage et de l'histoire.` },
        { name: "Loire", coords: [47.30, 0.70], color: "#852F3D", radius: 85000, desc: `Au cœur de la France, un vignoble à l'exceptionnelle variété étire ses coteaux le long de la Loire, cette Amazone à l'échelle angevine, et de ses affluents. Rouges, rosés, blancs secs, demi-secs, moelleux, liquoreux et effervescents : le Val de Loire (ou Vallée de la Loire) offre à l'amateur l'ensemble des genres de vin. Il englobe quatre zones de production, nommée pour trois d'entre elles d'après les capitales du fleuve, soit, en remontant le cours de la Loire :
    Le Pays nantais
    L'Anjou
    La Touraine
    Le Centre
Cette étendue donne au vignoble une certaine diversité climatique : toujours tempéré, il promet d'apaiser Du Bellay en présentant aussi bien l'air marin que la douceur angevine – auxquelles il ajoute encore la fraîcheur presque montagnarde du Massif central. Ses sols présentent une variété similaire, si ce n'est plus grande encore, depuis les roches volcaniques d'Auvergne jusqu'aux sables du pays nantais. Entre-temps, le réseau de la Loire traverse une profusion de terrains schisteux, argileux, granitiques, marneux, siliceux, calcaires ou crayeux.` },
        { name: "Rhône", coords: [44.80, 4.90], color: "#8F3F3F", radius: 65000, desc: `La vallée du Rhône, de Lyon à la Provence, est l’un des plus anciens vignobles de France, célèbre dès l’époque gallo-romaine et pour avoir fourni le vin des Papes durant le siège d’Avignon. L’AOC Côtes-du-Rhône couvre les deux rives entre Vienne et Avignon, héritant de l’ancienne "Côte-du-Rhône" (rive droite). D’autres appellations suivent les affluents du Rhône : Diois, Ventoux, Luberon, Costières-de-Nîmes et Clairette de Bellegarde. Le vignoble s’étend sur six départements : Vaucluse, Gard, Drôme, Ardèche, Loire et Rhône. Le climat varie du nord au sud avec un ensoleillement de 2000 à 2800 heures par an et l’influence du mistral au sud et de la bise au nord. La pluviométrie est équilibrée avec deux saisons sèches (hiver, été) et deux saisons pluvieuses (printemps, automne). Les cépages principaux sont :
Blancs : Clairette, Roussanne, Marsanne
Rouges : Grenache, Syrah, Mourvèdre 
Les vins se marient bien avec la cuisine méditerranéenne locale (huile d’olive, légumes, ail, herbes).`},
        { name: "Sud-Ouest", coords: [44.00, 1.20], color: "#995042", radius: 65000, desc: "Pays de cocagne pour tous les gastronomes, berceau du foie gras et du cassoulet, le sud-ouest français possède aussi ses lettres de noblesse en matière de vin. Et ce, depuis fort longtemps : la vigne y était déjà cultivée avant même la conquête romaine ! Ne formant autrefois qu'un seul et même vignoble avec les Bordeaux, sa réputation ne s'est cependant jamais vraiment remise du « privilège bordelais » octroyé par les rois d'Angleterre puis de France : pendant cinq siècles, jusqu'en 1773, les « vins du haut-pays » n'eurent le droit d'entrer dans le grand port que plusieurs semaines après ceux du proche vignoble, les monarchies ayant tenues à s'assurer la loyauté des puissants marchands bordelais. Cette ingérence de la haute politique dans les carafes et les verres est odieuse, certes, mais elle est heureusement facile à réparer ! Il n'est qu'à redécouvrir ce vignoble, l'un des plus savoureux, dans tous les sens du terme, par sa variété et son ancienneté." },
        { name: "Bourgogne", coords: [47.15, 4.80], color: "#A36145", radius: 50000, desc: `Auprès de la Saône, sur son couchant, s'étire l'un des vignobles les plus renommés au monde : la Bourgogne. Sur 250 km, du chablisien au maconnais, il traverse successivement les départements de l'Yonne (basse-Bourgogne), de la Côte d'Or (châtillonais, côte de Nuits et côte de Beaune) et de la Saône-et-Loire (côte chalonnaise puis maconnais).
C'est aussi l'un des plus anciens, puisqu'on en trouve mention dès l'époque romaine, chez Columelle et Pline l'Ancien – avec sa variété, le vitis allobrogica, qui pourrait être l'ancêtre du pinot. Son histoire sera intimement liée à celle des domaines religieux qui en organisent la culture et préservent ses traditions – dès le haut moyen-âge avec les abbayes de Cluny et de Citeaux, puis à compter du XVème siècle, avec les Hospices de Beaune fondés par le chancelier Rolin. Les ducs de Bourgogne réglementent à la fois son extension territoriale et son encépagement, ne faisant bien souvent qu'entériner une délimitation des meilleurs domaines déjà bien connue depuis plusieurs siècles.
` },
        { name: "Champagne", coords: [49.10, 4.00], color: "#AC7147", radius: 55000, desc: "Emblème liquide du luxe et de la fête, le Champagne est un vin effervescent produit dans la région éponyme, dans le nord-est de la France. Les vins de Champagne – qui ne pétillaient pas encore – furent d'ailleurs longtemps qualifiés de « vins de France », c'est-à-dire d'Île-de-France, toute proche. Son vignoble est aujourd'hui le plus septentrional du pays (avec 49,5° Nord à Reims), et quelques-unes de ces parcelles se trouvent toujours officiellement dans la région capitale – dans le département de la Seine-et-Marne." },
        { name: "Provence", coords: [43.50, 6.20], color: "#B17948", radius: 55000, desc: "La belle Provence abrite l'un des vignobles les plus attachants du terroir français... et assurément le plus ancien ! C'est en effet près de Marseille, que les colons grecs phocéens installèrent les premières vignes du pays peu après la fondation de la ville, plus de 500 ans avant notre ère. Leur progression vers Nice (Nikaia), Antibes (Antipolis), Arles (Arelate), Agde (Agathé) et bien d'autres comptoirs, popularisera la culture et la consommation du vin dans toute la Provence, et même au-delà, puisque le littoral hellénisé fut une véritable porte d'entrée pour la culture vinicole en Gaule - la ville d'Ampuis, dans les côtes-du-rhône, tirant ainsi son nom du grec emporion, qui signifiait simplement comptoir. Après la pax romana, le souci des vignes sera repris au premier chef par les abbayes provençales, notamment Saint-Victor (Marseille), Saint-Honorat (sur l'île de Lérins), le Tholonet et Montmajour." },
        { name: "Alsace", coords: [48.30, 7.40], color: "#B68149", radius: 45000, desc: `Planté au cœur de l'Europe, le vignoble alsacien connecte les mondes latin et germanique, selon un axe Nord-Sud de plus de 100 km. De Strasbourg à Mulhouse, il traverse 119 communes, pour une surface totale de 15 600 hectares. L'Alsace est d'abord réputée pour ses blancs, tranquilles ou effervescents (le fameux crémant), mais elle produit aussi quelques rouges et rosés.
Toutes les vignes d'Alsace prennent le soleil du matin sur le contrefort oriental des Vosges, où elles prospèrent aux altitudes moyennes - entre 170 et 480 mètres. Ce coteau d'une centaine de kilomètres, presque sans rupture, les met à l'abri des pluies : les Vosges assèchent et réchauffent les vents d'Ouest avant qu'ils n'atteignent la plaine d'Alsace, dont le vignoble est ainsi le moins pluvieux de France en moyenne annuelle, grâce au bien connu effet de foehn - qu'on retrouve en Ardèche ou en Haute-Provence. Le climat alsacien, continental et sec, se trouve ainsi bien plus clément pour la vigne qu'on pourrait l'attendre à cette latitude, avec une belle saison sèche et chaude.
Au niveau des sols, l'Alsace est une véritable mosaïque, puisque le vignoble longe la zone de fracture ouest du fossé rhénan : on y trouve aussi bien des calcaires, des granites, des schistes, du gneiss ou du grès. Généralement, une succession s'installe entre d'anciennes roches sur le haut des vignes (granite, gneiss ou ardoise), tandis que leur base, plus proche du Rhin, sera davantage formée de calcaires, de marnes, de lœss voire de limons.` },
        { name: "Beaujolais", coords: [46.10, 4.70], color: "#BB8A4A", radius: 25000, desc: `Le plus méridional des Bourgogne : c'est ainsi qu'on pourrait présenter le Beaujolais. Situé au nord du département du Rhône, entre Mâcon et Lyon, dont il est le « troisième fleuve », ce vignoble, qui tient son nom de son ancienne capitale Beaujeu, est principalement connu pour son vin rouge à cépage gamay – bien qu'une poignée de cépages « accessoires » y soient aussi licites (dans la limite de 15 % des surfaces) : l'aligoté, le melon, le pinot gris, le pinot noir, le gamay de Bouze et le gamay de Chaudenay.
Le beaujolais naît sur des coteaux exposés est et sud-est – généralement assez hauts dans les pentes, afin de tenir la vigne abritée des brumes hivernales, qui sont fréquentes dans la vallée de la Saône.
Au Nord, le terrain est granitique (« granit de Fleurie ») : c'est un sol pauvre et dur, qui convient particulièrement au Gamay, un cépage naturellement très voire trop fertile.
Au Sud, ce sont des calcaires : les fameuses pierres dorées.
Les deux zones sont séparées par un affluent de la Saône – le Nizerand. Sur l'ensemble du vignoble, le climat est continental, avec des hivers froids et plutôt secs.
` },
        { name: "Corse", coords: [42.15, 9.10], color: "#C0924B", radius: 60000, desc: "Non, décidément, les dieux n'ont pas été pingres avec l'île de beauté ! Ses plages, ses paysages, sa lumière n'étaient pas assez : pour notre plus grand bonheur ils ont achevé leur œuvre d'un trait de vignes, tout autour de son littoral. Depuis, les vignerons font le reste, à savoir essentiellement des rouges et des rosés, quelques blancs, ainsi qu'un fameux muscat. Des vins de France qui s'ancrent aussi, de par le climat et par les cépages, dans le vaste champ viticole de la Méditerranée." },
        { name: "Savoie", coords: [45.65, 6.10], color: "#C59A4C", radius: 35000, desc: `Si la Savoie est mondialement connue pour ses domaines skiables, les amateurs de vin savent bien qu'elle abrite aussi un vignoble unique par ses conditions climatiques, qui font de la viticulture locale une véritable prouesse technique - tout en étant, dans un registre plus terre à terre, l'accompagnement naturel et savoureux des spécialités bien connues de la gastronomie locale.
Comme son nom ne l'indique pas, le vignoble de Savoie déborde en fait sur trois autres départements : la Haute-Savoie bien sûr, mais aussi l'Ain - à Corbonod et Seyssel, deux communes situées juste de l'autre côté du Rhône -, et l'Isère, à Champareillan - là encore, une commune limitrophe, qui longe la rivière Isère. Actuellement, il mobilise un peu moins de 2 000 hectares - ce qui ne donne qu'une modeste idée de ce que fut autrefois l'importance du vignoble dans les paysages. 
` },
        { name: "Jura", coords: [46.70, 5.55], color: "#C9A24D", radius: 25000, desc: "Avec à peine deux milliers d'hectares qu'on dirait presque oubliés entre Alsace, Bourgogne et Valais, le vignoble du Jura est l'un des plus petits du terroir français. Ne « pèse »-t-il pas seulement 0,2 % de la surface plantée du pays ? Un débutant pourrait ainsi sous-estimer son importance œnologique... grave erreur ! Le Jura réussit en effet le prodige, sur une si petite surface, de développer une production inimitable, à la personnalité très forte, autour des merveilles que sont le vin jaune, le vin de paille et plus généralement les blancs à base de savagnin." },
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