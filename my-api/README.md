# Reader Dungeon API 

This is a Node API that serves a game I'm writing called The Reader Dungeon. The player will read a random tile and act according to what the tile demands. Every Tile will give a certain amount of Treasures, and some will give an item. The player will have to choose what to do to pass the tile. 

This API will only have one entity: the Tile. 

## Endpoints

### GET /tiles 

get all the tiles

### GET/tiles/:id 

get the tiles of a certain id

### POST /tiles

saves a tile to the database

