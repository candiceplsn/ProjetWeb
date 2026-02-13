-- =====================================================
-- BASE DE DONNÉES : VINS FRANÇAIS
-- Fichier : 01_creation_tables.sql
-- SGBD : PostgreSQL
-- =====================================================

-- Suppression des tables (ordre des dépendances)
DROP TABLE IF EXISTS vins CASCADE;
DROP TABLE IF EXISTS domaines CASCADE;
DROP TABLE IF EXISTS regions CASCADE;

-- =====================================================
-- TABLE : regions
-- =====================================================

CREATE TABLE regions (
    id_region SERIAL PRIMARY KEY,
    nom_region VARCHAR(50) NOT NULL UNIQUE,
    description TEXT
);

-- =====================================================
-- TABLE : domaines
-- =====================================================

CREATE TABLE domaines (
    id_domaine SERIAL PRIMARY KEY,
    nom_domaine VARCHAR(100) NOT NULL,
    description TEXT,
    id_region INT NOT NULL,
    CONSTRAINT fk_domaines_regions
        FOREIGN KEY (id_region)
        REFERENCES regions(id_region)
        ON DELETE CASCADE
);

-- =====================================================
-- TABLE : vins
-- =====================================================

CREATE TABLE vins (
    id_vin SERIAL PRIMARY KEY,
    nom_vin VARCHAR(150) NOT NULL,
    id_domaine INT NOT NULL,
    prix_euro NUMERIC(10,2) NOT NULL CHECK (prix_euro >= 0),
    type_vin VARCHAR(20) NOT NULL
        CHECK (type_vin IN ('rouge', 'blanc', 'rosé', 'pétillant')),
    annee_production INT NOT NULL
        CHECK (annee_production BETWEEN 1900 AND EXTRACT(YEAR FROM CURRENT_DATE)),
    accord_mets VARCHAR(250),
    description TEXT,
    CONSTRAINT fk_vins_domaines
        FOREIGN KEY (id_domaine)
        REFERENCES domaines(id_domaine)
        ON DELETE CASCADE
);
