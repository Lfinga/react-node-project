import { existsSync } from 'fs'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

/**
 * Constante indiquant si la base de données existe au démarrage du serveur
 * ou non.
 */

/**
 * Crée une base de données par défaut pour le serveur. Des données fictives
 * pour tester le serveur y ont été ajouté.
 */
const createDatabase = async () => {
  const IS_NEW = !existsSync(process.env.DB_FILE)
  const connection = await open({
    filename: process.env.DB_FILE,
    driver: sqlite3.Database,
  })

  await connection.exec(`PRAGMA foreign_keys = ON;`)
  if (!IS_NEW) return connection
  await connection.exec(
    `CREATE TABLE type_utilisateur(
			id_type_utilisateur INTEGER PRIMARY KEY,
			nom TEXT NOT NULL
			);
			
		
		
		CREATE TABLE etat_commande(
			id_etat_commande INTEGER PRIMARY KEY,
			nom TEXT NOT NULL
		);
		
		CREATE TABLE produit(
			id_produit INTEGER PRIMARY KEY,
			nom TEXT,
			chemin_image TEXT,
			prix REAL
		);
		
		CREATE TABLE utilisateur(
			id_utilisateur INTEGER PRIMARY KEY,
			id_type_utilisateur INTEGER,
			courriel TEXT,
			mot_de_passe TEXT,
			prenom TEXT,
			nom TEXT,
			FOREIGN KEY(id_type_utilisateur)
			REFERENCES type_utilisateur(id_type_utilisateur)
		);
		
		CREATE TABLE commande(
			id_commande INTEGER PRIMARY KEY,
			id_utilisateur INTEGER,
			id_etat_commande INTEGER,
			date INTEGER,
			FOREIGN KEY(id_utilisateur)
			REFERENCES utilisateur(id_utilisateur),
			FOREIGN KEY(id_etat_commande)
			REFERENCES etat_commande(id_etat_commande)
		);
		
		CREATE TABLE commande_produit(
			id_commande INTEGER,
			id_produit INTEGER,
			quantite INTEGER,
			PRIMARY KEY(id_commande, id_produit)
			FOREIGN KEY(id_commande)
			REFERENCES commande(id_commande)
			ON DELETE CASCADE,
			FOREIGN KEY(id_produit)
			REFERENCES produit(id_produit)
			ON DELETE CASCADE
		);

		
		INSERT INTO type_utilisateur(nom) VALUES('client');
		INSERT INTO type_utilisateur(nom) VALUES('administrateur');
		
		
		
		INSERT INTO utilisateur(id_type_utilisateur, courriel, mot_de_passe, prenom, nom)
		VALUES(1, 'test@test.com', 'Test1234', 'Test', 'Test');
		
		INSERT INTO etat_commande(nom)
		VALUES("Dans le panier"),
		("En cuisine"),
		("En livraison"),
		("Terminee");


		INSERT INTO produit(nom,chemin_image,prix)
		VALUES('burger','./img/burger-card.png',18);
		INSERT INTO produit(nom,chemin_image,prix)
		VALUES('chicken-wings','./img/chicken-wings.jpg',17);
		INSERT INTO produit(nom,chemin_image,prix)
		VALUES('nuggets','./img/nuggets.jpg',20);
		INSERT INTO produit(nom,chemin_image,prix)
		VALUES('pizza','./img/pizza.jpg',19);
		INSERT INTO produit(nom,chemin_image,prix)
		VALUES('poutine','./img/poutine.jpg',13);
		INSERT INTO produit(nom,chemin_image,prix)
		VALUES('tacos','./img/tacos.jpg',14);
		INSERT INTO produit(nom,chemin_image,prix)
		VALUES('pizza','./img/pizza.jpg',19);
		INSERT INTO produit(nom,chemin_image,prix)
		VALUES('poutine','./img/poutine.jpg',13);
		INSERT INTO produit(nom,chemin_image,prix)
		VALUES('tacos','./img/tacos.jpg',14);
		`
  )

  return connection
}

// Base de données dans un fichier

// Si le fichier de base de données n'existe pas, on crée la base de données
// et on y insère des données fictive de test.

let dbClient
async function getDbClient() {
  if (!dbClient) {
    dbClient = await createDatabase()
  }
  return dbClient
}

export default getDbClient
