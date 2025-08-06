module.exports = app => {
    const producciones = require("../controllers/produccion.controller.js");
    var router = require("express").Router();

    router.post("/create/", producciones.create);

    router.get("/", producciones.findAll);

    router.get("/:id", producciones.findOne);

    router.get("/nombre/:name", producciones.findByName);

    router.put("/update/:id", producciones.update);

    router.delete("/delete/:id", producciones.delete);

    router.delete("/delete/", producciones.deleteAll);
    
    app.use("/api/customer/produccion", router); 
};