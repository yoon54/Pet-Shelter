const Pets = require("../controllers/pet.controller");
const Users = require("../controllers/user.controller");
const { authenticate } = require("../config/jwt");


module.exports = app => {

    app.post("/api/register", Users.register);
    app.post("/api/login",  Users.login);
    app.get("/api/Pets", authenticate, Pets.getAll);
    app.post("/api/Pets", authenticate, Pets.create);
    app.get("/api/Pets/:_id", authenticate, Pets.getOne);
    app.delete("/api/Pets/:_id", authenticate, Pets.delete);
    app.put("/api/Pets/edit/:_id", authenticate, Pets.edit);
    app.put("/api/pets/likes/:_id", authenticate, Pets.addLikes);
}