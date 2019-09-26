const mongoose = require('mongoose');

const PedidoSchema = mongoose.Schema({
    ciclo: String,
    cliente: String,
    producto: Number,
    cantidad: Number,
    precio: Number,
    porGanancia: Number,
    puntos: Number,
    notas: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Pedido', PedidoSchema);