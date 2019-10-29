const Pedido = require('../models/pedidoModel.js');

// Crear nuevo pedido
exports.create = (req, res) => {
    // Validate request
    if(!req.body.ciclo) {
        return res.status(400).send({
            message: "Debe informar ciclo"
        });
    }
    if(!req.body.cliente) {
        return res.status(400).send({
            message: "Debe informar cliente"
        });
    }
    if(!req.body.producto) {
        return res.status(400).send({
            message: "Debe informar producto"
        });
    }
    if(!req.body.cantidad) {
        return res.status(400).send({
            message: "Debe inormar cantidad"
        });
    }
    if(!req.body.precio) {
        return res.status(400).send({
            message: "Debe informar precio"
        });
    }
    if(!req.body.porGanancia) {
        return res.status(400).send({
            message: "Debe informar % de ganancia"
        });
    }
    if(!req.body.paraMi) {
        return res.status(400).send({
            message: "Debe informar el indicador paraMi"
        });
    }
    if(!req.body.puntos) {
        return res.status(400).send({
            message: "Debe infotmar puntos"
        });
    }

    // Crear el pedido
    const pedido = new Pedido({
        ciclo: req.body.ciclo,
        cliente: req.body.cliente,
        producto: req.body.producto,
        cantidad: req.body.cantidad,
        precio: req.body.precio,
        porGanancia: req.body.porGanancia,
        puntos: req.body.puntos,
        paraMi: req.body.paraMi,
        notas: req.body.notas
    });

    // Guardar el pedido de la base de datos
    pedido.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error en la creacion del pedido."
        });
    });
};

// Consultar todos los pedidos
exports.findAll = (req, res) => {
    Pedido.find()
    .then(pedidos => {
        res.send(pedidos);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error en la consulta de los pedidos."
        });
    });
};

// Consultar todos los pedidos
exports.findOne = (req, res) => {
    Pedido.find(req.params.producto)
    .then(pedidos => {
        res.send(pedidos);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error en la consulta de los pedidos."
        });
    });
};

// Eliminar el pedido con ID
exports.delete = (req, res) => {
    Pedido.findByIdAndRemove(req.params.pedidoId)
    .then(pedido => {
        if(!pedido) {
            return res.status(404).send({
                message: "No se encuentra el pedido para el ID " + req.params.pedidoId
            });
        }
        res.send({message: "Pedido eliminado!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "No se encuentra el pedido para el ID " + req.params.pedidoId
            });                
        }
        return res.status(500).send({
            message: "No se puede eliminar el pedido para el ID " + req.params.noteId
        });
    });
};