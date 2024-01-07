module.exports = app => { 
    const users = require ("../controllers/users_controllers.js")
  
    var router = require("express").Router();
    router.post("/inscription",users.inscription);
    router.post("/",users.create);
    router.get("/",users.getAll);
    router.get("/:id",users.getOne); 
    app.use('/api/users',router);
    }