DROP DATABASE IF EXISTS reader_dungeon;
CREATE DATABASE reader_dungeon;

use reader_dungeon;

CREATE TABLE Tile(
	id INT PRIMARY KEY AUTO_INCREMENT, 
	title VARCHAR(100),
	text VARCHAR(1000),
	treasures INT
);

INSERT INTO Tile (title, text, treasures) VALUES ("Primeiríssimo Tile Criado", "Este é o primeiro tile criado na reader dungeon.", 3);
INSERT INTO Tile (title, text, treasures) VALUES ("Segundo Tile", "Este é o segundo tile criado na reader dungeon.", 2);
INSERT INTO Tile (title, text, treasures) VALUES ("Terceiro Tile", "Este é o terceiro tile criado na reader dungeon.", 1);

CREATE TABLE Action (
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(50),
	item VARCHAR(20),
	tile_id INT,
	quantity INT,
	FOREIGN KEY (tile_id) REFERENCES Tile(id) 
);

INSERT INTO Action (name, item, tile_id, quantity) VALUES ("Pegar Espada", "Espada", 1,1);
INSERT INTO Action (name, item, tile_id, quantity) VALUES ("Usar Lança", "Lança", 1,-1);
INSERT INTO Action (name, item, tile_id, quantity) VALUES ("Pegar Escudo", "Escudo", 2,1);
INSERT INTO Action (name, item, tile_id, quantity) VALUES ("Usar Escudo", "Escudo", 2,-1);
INSERT INTO Action (name, item, tile_id, quantity) VALUES ("Pegar Poção", "Poção", 3,1);