module.exports = (app) => {
    const clientes = require('../controllers/clienteController.js');

    // Crear nuevo cliente
    app.post('/clientes', clientes.create);

    // Consultar todos los clientes
    app.get('/clientes', clientes.findAll);

    // Eliminar un cliente por id
    app.delete('/clientes/:clienteId', clientes.delete);
}