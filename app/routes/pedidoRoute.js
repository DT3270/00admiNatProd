module.exports = (app) => {
    const pedidos = require('../controllers/pedidoController.js');

    // Crear nuevo pedido
    app.post('/pedidos', pedidos.create);

    // Consultar todos los pedidos
    app.get('/pedidos', pedidos.findAll);

    // Eliminar un pedido por id
    app.delete('/pedidos/:pedidoId', pedidos.delete);
}