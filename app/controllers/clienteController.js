const Cliente = require('../models/clienteModel.js');

// Crear nuevo cliente
exports.create = (req, res) => {
    // Validate request
    if(!req.body.nombre) {
        return res.status(400).send({
            message: "Debe informar nombre"
        });
    }

    // Crear el cliente
    const cliente = new Cliente({
        nombre: req.body.nombre,
        mail: req.body.mail,
        telefono1: req.body.telefono2,
        telefono2: req.body.telefono2,
        direccion: req.body.direccion
    });

    // Guardar el cliente en la base de datos
    cliente.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error en la creacion del cliente."
        });
    });
};

// Consultar todos los clientes
exports.findAll = (req, res) => {
    Cliente.find()
    .then(clientes => {
        res.send(clientes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error en la consulta de los clientes."
        });
    });
};

// Eliminar el ciclo con ID
exports.delete = (req, res) => {
    Ciclo.findByIdAndRemove(req.params.cicloId)
    .then(ciclo => {
        if(!ciclo) {
            return res.status(404).send({
                message: "No se encuentra el cliente para el ID " + req.params.clienteId
            });
        }
        res.send({message: "Cliente eliminado!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "No se encuentra el cliente para el ID " + req.params.clienteId
            });                
        }
        return res.status(500).send({
            message: "No se puede eliminar el cliente para el ID " + req.params.clienteId
        });
    });
};