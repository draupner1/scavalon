# SlotCarduion

Webapplication for the Scalectric Automatic Competition server.

Running on NodeJS server with:
*MongoDB
*Gulp
*Ractive
*MaterializeCSS

Rankingsidan uppdateras var 60 s. (ändras frontend/js/controllers/Home.js)

Installs on the server:
npm install


Uppstart innan server:
./mongod &
gulp &


Man kan mata databasen med vartiden genom:
curl -H "Content-Type: application/json" -X POST -d @lane2.json http://scavalon-draupner-1.c9users.io/api/laps

där filen:lane2.json, innehåller jason-kodat data.


curl -H "Content-Type: application/json" -X POST -d @ip2.json http://scavalon-draupner-1.c9users.io/api/link
curl -H "Content-Type: application/json" -X DELETE http://scavalon-draupner-1.c9users.io/api/link


