const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Mierda! No puedo conectar a la base...', err, 'mas:', dbConfig.url);
    process.exit();
});

app.all('*', function(req, res, next) {
        res.header("Content-Type", "application/json");
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
        res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
        next();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "unaCucharaGris - Bienvenidos"});
});

// Require pedido routes
require('./app/routes/pedidoRoute.js')(app);

// Require ciclo routes
require('./app/routes/cicloRoute.js')(app);

// Require cliente routes
require('./app/routes/clienteRoute.js')(app);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});