const db = require("../models");
const Produccion = db.producciones;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validamos que dentro del  request no venga vacio el nombre, de lo contrario returna error
    if (!req.body.nombre) {
        res.status(400).send({
            message: "Nombre no puede estar vacío!"
        });
        return;
    }

    const produccion = {
        nombre: req.body.nombre,
        sinopsis: req.body.sinopsis,
        actores: req.body.actores, 
        duracion: req.body.duracion,
        tipo: req.body.tipo,
        categoria: req.body.categoria,
        lanzamiento:req.body.lanzamiento
    };

    Produccion.create(produccion)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error creando la Produccion."
            });
        });
};

//GET
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Produccion.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error obteniendo las Producciones."
            });
        });
};

// GET por ID
exports.findOne = (req, res) => {
    const id = req.params.id;

    Produccion.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Ha ocurrido un error obteniendo la produccion con el id=" + id
            });
        });
};

//GET por nombre
exports.findByName = (req, res) => {
    const nombre = req.params.nombre;

    Produccion.findAll({
        where: { nombre: { [Op.iLike]: `%${nombre}%` } }
    })
        .then(data => {
            if (data.length > 0) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontraron producciones con el nombre ${nombre}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al buscar producciones por nombre: " + err.message
            });
        });
};

//PUT 
exports.update = (req, res) => {
    const id = req.params.id;

    Produccion.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "la Produccion ha sido actualizada correctamente."
                });
            } else {
                res.send({
                    message: `No se puede actualizar Produccion con id=${id}. Tal vez Produccion no fue encontrada o el req.body esta vacio!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error actualizando Produccion con id=" + id
            });
        });
};

// DELETE por ID
exports.delete = (req, res) => {
    const id = req.params.id;
    // utilizamos el metodo destroy para eliminar el objeto mandamos la condicionante where id = parametro que recibimos 
    Produccion.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Produccion fue eliminada correctamente!"
                });
            } else {
                res.send({
                    message: `No se pudo eliminar la Produccion con id=${id}. Produccion no encontada!` 
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar la Produccion con id=" + id
            });
        });
};

// DELETE todos
exports.deleteAll = (req, res) => {
    Produccion.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Las Producciones fueron eliminadas correctamente!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error eliminando todas las Producciones."
            });
        });
};