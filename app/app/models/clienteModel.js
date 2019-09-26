const mongoose = require('mongoose');

const clienteSchema = mongoose.Schema({
    nombre: String,
    mail: String,
    telefono1: String,
    telefono2: String,
    direccion: String
}, {
    timestamps: true
});

module.exports = mongoose.model('cliente', clienteSchema);