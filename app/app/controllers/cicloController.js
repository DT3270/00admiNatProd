const Ciclo = require('../models/cicloModel.js');

// Crear nuevo ciclo
exports.create = (req, res) => {
    // Validate request
    if(!req.body.ciclo) {
        return res.status(400).send({
            message: "Debe informar ciclo"
        });
    }
    if(!req.body.fechaInicio) {
        return res.status(400).send({
            message: "Debe informar fecha de inicio"
        });
    }
    if(!req.body.fechaFin) {
        return res.status(400).send({
            message: "Debe informar fecha de fin"
        });
    }
    if(!req.body.estado) {
        return res.status(400).send({
            message: "Debe inormar estado"
        });
    }

    // Crear el ciclo
    const ciclo = new Ciclo({
        ciclo: req.body.ciclo,
        fechaInicio: req.body.fechaInicio,
        fechaFin: req.body.fechaFin,
        estado: req.body.estado,
        observacion: req.body.observacion
    });

    // Guardar el ciclo en la base de datos
    ciclo.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error en la creacion del ciclo."
        });
    });
};

// Consultar todos los ciclos
exports.findAll = (req, res) => {
    Ciclo.find()
    .then(ciclos => {
        res.send(ciclos);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error en la consulta de los ciclos."
        });
    });
};

// Eliminar el ciclo con ID
exports.delete = (req, res) => {
    Ciclo.findByIdAndRemove(req.params.cicloId)
    .then(ciclo => {
        if(!ciclo) {
            return res.status(404).send({
                message: "No se encuentra el ciclo para el ID " + req.params.cicloId
            });
        }
        res.send({message: "Ciclo eliminado!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "No se encuentra el ciclo para el ID " + req.params.cicloId
            });                
        }
        return res.status(500).send({
            message: "No se puede eliminar el ciclo para el ID " + req.params.cicloId
        });
    });
};