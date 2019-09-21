const mongoose = require('mongoose');

const CicloSchema = mongoose.Schema({
    ciclo: String,
    fechaInicio: Date,
    fechaFin: Date,
    estado: String,
    observacion: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Ciclo', CicloSchema);