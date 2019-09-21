module.exports = (app) => {
    const ciclos = require('../controllers/cicloController.js');

    // Crear nuevo ciclo
    app.post('/ciclos', ciclos.create);

    // Consultar todos los ciclos
    app.get('/ciclos', ciclos.findAll);

    // Eliminar un ciclo por id
    app.delete('/ciclos/:cicloId', ciclos.delete);
}