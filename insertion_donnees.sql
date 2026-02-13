-- Nettoyage complet pour repartir sur une base propre
TRUNCATE vins, domaines, regions RESTART IDENTITY CASCADE;

-- 1. Insertion des 14 régions (Valeurs fixes)
INSERT INTO regions (nom_region) VALUES 
('Alsace'), ('Bordeaux'), ('Bourgogne'), ('Champagne'), ('Corse'), 
('Beaujolais'), ('Savoie'), ('Languedoc'), ('Roussillon'), ('Provence'), 
('Jura'), ('Sud-Ouest'), ('Loire'), ('Rhône');

-- 2. Insertion de 40 domaines (Répartition sur les 14 régions)
INSERT INTO domaines (nom_domaine, id_region) VALUES 
('Domaine Trimbach', 1), ('Domaine Weinbach', 1), ('Hugel & Fils', 1), -- Alsace
('Château Margaux', 2), ('Château d''Yquem', 2), ('Château Latour', 2), ('Château Cheval Blanc', 2), -- Bordeaux
('Domaine Leroy', 3), ('Domaine Armand Rousseau', 3), ('Domaine Leflaive', 3), -- Bourgogne
('Champagne Krug', 4), ('Champagne Taittinger', 4), ('Champagne Pol Roger', 4), -- Champagne
('Domaine de Vaccelli', 5), ('Clos Culombu', 5), -- Corse
('Domaine des Terres Dorées', 6), ('Château des Jacques', 6), -- Beaujolais
('Domaine de la Tour des Curistes', 7), ('Adrien Berlioz', 7), -- Savoie
('Mas de Daumas Gassac', 8), ('Château de Puech-Haut', 8), ('Domaine Gauby', 9), -- Languedoc / Roussillon
('Clos Sainte-Magdeleine', 10), ('Château Simone', 10), ('Domaine de Trévallon', 10), -- Provence
('Domaine Labet', 11), ('Stéphane Tissot', 11), -- Jura
('Château Bouscassé', 12), ('Domaine Elian Da Ros', 12), ('Camin Larredya', 12), -- Sud-Ouest
('Didier Dagueneau', 13), ('Domaine de la Taille aux Loups', 13), ('Nicolas Joly', 13), ('Clos Rougeard', 13), -- Loire
('Jean-Louis Chave', 14), ('Château Rayas', 14), ('Domaine du Vieux Télégraphe', 14), ('M. Chapoutier', 14), ('Auguste Clape', 14), ('Thierry Allemand', 14); -- Rhône

-- 3. Insertion de 60 vins
INSERT INTO vins (nom_vin, id_domaine, prix_euro, type_vin, annee, accord_met, description) VALUES 
-- Alsace
('Riesling Cuvée Frédéric Emile', 1, 65.00, 'Blanc', 2017, 'Poisson noble', 'Un riesling sec, puissant et d''une grande garde.'),
('Pinot Gris Altenbourg', 2, 48.00, 'Blanc', 2020, 'Foie gras poêlé', 'Arômes de fruits jaunes mûrs et texture veloutée.'),
('Gentil d''Alsace', 3, 18.50, 'Blanc', 2021, 'Cuisine asiatique', 'L''alliance parfaite des cépages alsaciens, frais et floral.'),

-- Bordeaux
('Pavillon Rouge', 4, 220.00, 'Rouge', 2015, 'Agneau de sept heures', 'Second vin du Château Margaux, une élégance rare.'),
('Sauternes Premier Cru', 5, 350.00, 'Blanc', 2011, 'Roquefort', 'Le plus célèbre des vins liquoreux, notes de miel et safran.'),
('Pauillac Grand Cru', 6, 680.00, 'Rouge', 2010, 'Châteaubriand', 'Une structure monumentale, un vin de légende.'),
('Le Petit Cheval', 7, 180.00, 'Rouge', 2016, 'Plats truffés', 'Un vin soyeux dominé par le Cabernet Franc.'),

-- Bourgogne
('Vosne-Romanée', 8, 450.00, 'Rouge', 2018, 'Pigeon rôti', 'Une complexité aromatique envoûtante, des tanins de dentelle.'),
('Chambertin Grand Cru', 9, 750.00, 'Rouge', 2014, 'Gibier à poil', 'La puissance et la noblesse du Pinot Noir de Gevrey.'),
('Chevalier-Montrachet', 10, 520.00, 'Blanc', 2019, 'Homard', 'Le sommet des vins blancs du monde, minéral et beurré.'),

-- Champagne
('Grande Cuvée 170ème Édition', 11, 210.00, 'Pétillant', NULL, 'Caviar', 'Assemblage de plus de 120 vins de plus de 10 années différentes.'),
('Comtes de Champagne', 12, 165.00, 'Pétillant', 2012, 'Noix de Saint-Jacques', '100% Chardonnay, une bulle d''une finesse exceptionnelle.'),
('Cuvée Sir Winston Churchill', 13, 240.00, 'Pétillant', 2013, 'Viandes blanches crémées', 'Un champagne robuste et mature, taillé pour la table.'),

-- Corse
('Vaccelli Rouge', 14, 34.00, 'Rouge', 2021, 'Charcuterie corse', 'Cépage Sciaccarellu dominant, notes de poivre et de maquis.'),
('Ribbe Rosse', 15, 29.00, 'Blanc', 2022, 'Loup grillé', 'Un Vermentinu salin, bercé par les embruns marins.'),

-- Beaujolais
('L''Ancien', 16, 19.00, 'Rouge', 2022, 'Apéritif campagnard', 'Un beaujolais gourmand, pur fruit, issu de vieilles vignes.'),
('Moulin-à-Vent Clos du Grand Carquelin', 17, 32.00, 'Rouge', 2019, 'Bavette à l''échalote', 'Un vin structuré qui rappelle les crus de Bourgogne.'),

-- Savoie
('Abymes', 18, 14.00, 'Blanc', 2022, 'Raclette', 'Frais, perlant et léger, le compagnon idéal de l''hiver.'),
('Chignin-Bergeron Les Fripons', 19, 36.00, 'Blanc', 2021, 'Poissons de lac', 'Arômes d''abricot et de fleurs blanches, une grande onctuosité.'),

-- Languedoc / Roussillon
('Gassac Rouge', 20, 42.00, 'Rouge', 2019, 'Côte de bœuf', 'Surnommé le Grand Cru du Languedoc, très complexe.'),
('Prestige Rouge', 21, 22.00, 'Rouge', 2020, 'Grillades', 'Un vin généreux, gorgé de soleil et de fruits noirs.'),
('Muntada', 22, 95.00, 'Rouge', 2018, 'Plats épicés', 'Une Syrah monumentale sur des terroirs de schistes.'),

-- Provence
('Cassis Blanc', 23, 28.00, 'Blanc', 2022, 'Bouillabaisse', 'Une minéralité iodée, typique du bord de mer.'),
('Palette Rouge', 24, 45.00, 'Rouge', 2017, 'Daube provençale', 'Un vin historique, élevé longuement sous bois.'),
('La Bégude Rosé', 25, 26.00, 'Rosé', 2022, 'Cuisine méditerranéenne', 'Un rosé de caractère, structuré et vineux.'),

-- Jura
('La Bardette', 26, 48.00, 'Blanc', 2020, 'Poulet aux morilles', 'Chardonnay jurassien, droit, tendu et très minéral.'),
('En Barberon Pinot Noir', 27, 42.00, 'Rouge', 2021, 'Petit gibier', 'Un rouge fin, infusé, aux notes de petits fruits rouges.'),

-- Sud-Ouest
('Vieilles Vignes', 28, 38.00, 'Rouge', 2016, 'Magret de canard', 'La force du Tannat assouplie par un grand savoir-faire.'),
('Le Vin des Amis', 29, 17.50, 'Rouge', 2021, 'Pizzas artisanales', 'Un vin de soif, fruité et épicé, sans artifice.'),
('Les Jardins de Babylone', 30, 85.00, 'Blanc', 2018, 'Desserts aux fruits', 'Un Jurançon moelleux d''une pureté cristalline.'),

-- Loire
('Silex', 31, 160.00, 'Blanc', 2019, 'Saumon fumé', 'Le Sauvignon Blanc à son paroxysme, fumé et tranchant.'),
('Remus', 32, 35.00, 'Blanc', 2021, 'Fromage de chèvre', 'Un Chenin sec vibrant d''énergie et de fraîcheur.'),
('La Coulée de Serrant', 33, 95.00, 'Blanc', 2019, 'Foie gras poêlé', 'Un vignoble culte en biodynamie, une intensité unique.'),
('Le Bourg', 34, 130.00, 'Rouge', 2017, 'Agneau de lait', 'La quintessence du Cabernet Franc de Saumur.'),

-- Rhône
('Hermitage Blanc', 35, 190.00, 'Blanc', 2016, 'Truffe blanche', 'Un vin blanc de garde, gras, riche et impérial.'),
('Pignan', 36, 150.00, 'Rouge', 2018, 'Couscous royal', 'Le Grenache dans toute sa finesse, aérien et floral.'),
('La Crau', 37, 85.00, 'Rouge', 2020, 'Gigot d''agneau', 'Le terroir mythique des galets roulés, puissant et épicé.'),
('La Sizeranne', 38, 75.00, 'Rouge', 2017, 'Gibier en sauce', 'Un Hermitage profond, aux notes de poivre et de réglisse.'),
('Cornas Renaissance', 39, 68.00, 'Rouge', 2019, 'Côte de bœuf au sel', 'Une Syrah sauvage, sombre et magnifiquement équilibrée.'),
('Reynard', 40, 110.00, 'Rouge', 2018, 'Viande maturée', 'Un Cornas d''une concentration extrême, pour les puristes.'),

-- Compléments pour atteindre 60 vins (vins additionnels sur domaines existants)
('Riesling Réserve', 1, 24.00, 'Blanc', 2021, 'Fruits de mer', 'Frais, sec et fruité, le classique de la maison.'),
('Gewurztraminer Vendanges Tardives', 2, 55.00, 'Blanc', 2018, 'Munster', 'Nez de litchi et de rose, une douceur infinie.'),
('Pinot Noir G', 3, 45.00, 'Rouge', 2019, 'Viande rouge', 'Un rouge alsacien qui rivalise avec les bourgognes.'),
('Altos de Lynch', 6, 45.00, 'Rouge', 2019, 'Burger gourmet', 'Un Bordeaux moderne et accessible rapidement.'),
('Bourgogne Blanc', 8, 85.00, 'Blanc', 2020, 'Apéritif chic', 'Le vin d''entrée de gamme d''un domaine mythique.'),
('Chassagne-Montrachet', 10, 95.00, 'Blanc', 2020, 'Poissons grillés', 'Minéralité calcaire et fleurs blanches.'),
('Brut Réserve', 12, 45.00, 'Pétillant', NULL, 'Apéritif', 'L''équilibre parfait de la maison Taittinger.'),
('Fleurie', 16, 22.00, 'Rouge', 2021, 'Poulet rôti', 'Le plus féminin des crus du Beaujolais.'),
('Crozes-Hermitage Petite Ruche', 38, 28.00, 'Rouge', 2021, 'Planches de charcuterie', 'Une syrah poivrée et croquante.'),
('Saint-Joseph Deschants', 38, 35.00, 'Rouge', 2020, 'Agneau grillé', 'Un vin élégant avec des notes de violette.'),
('Châteauneuf-du-Pape Blanc', 37, 55.00, 'Blanc', 2021, 'Bouillabaisse', 'Rare et onctueux, aux notes de fleurs de vigne.'),
('Saumur-Champigny Les Poyeux', 34, 90.00, 'Rouge', 2018, 'Filet mignon', 'Un terroir de légende pour le Cabernet Franc.'),
('Montlouis Clos du Volnay', 32, 29.00, 'Blanc', 2022, 'Huîtres', 'Un chenin sec et tendu comme une lame.'),
('Pouilly-Fumé Petit Fumé', 31, 38.00, 'Blanc', 2022, 'Fromage frais', 'Le fruit du sauvignon sur un terroir de silex.'),
('Madiran Bouscassé', 28, 26.00, 'Rouge', 2017, 'Confit de canard', 'Une icône du Sud-Ouest, robuste et généreux.'),
('Jurançon Sec La Part Davant', 30, 22.00, 'Blanc', 2021, 'Saumon', 'Vif avec des arômes de pamplemousse.'),
('Palette Blanc', 24, 42.00, 'Blanc', 2020, 'Loup au fenouil', 'Un blanc de gastronomie, rare et complexe.'),
('Savennières Clos du Papillon', 33, 50.00, 'Blanc', 2020, 'Homard', 'Un chenin de grande garde, profond et salin.'),
('Cornas Chaillot', 40, 95.00, 'Rouge', 2019, 'Cerf', 'La puissance brute de la Syrah sur granit.'),
('Vacqueyras', 37, 24.00, 'Rouge', 2020, 'Moussaka', 'Un vin du sud généreux et ensoleillé.');