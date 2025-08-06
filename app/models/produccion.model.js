module.exports = (sequelize, Sequelize) => {
    const Produccion = sequelize.define("produccion", {
        nombre: {
            type: Sequelize.STRING
        },
        sinopsis: {
            type: Sequelize.STRING
        },
        actores: {
            type: Sequelize.STRING
        },
        duracion: {
            type: Sequelize.STRING
        },        
        tipo: {
            type: Sequelize.STRING
        },
        categoria:{
            type: Sequelize.STRING
        },
        lanzamiento: {
            type: Sequelize.STRING
        }
    });
    return Produccion;
};