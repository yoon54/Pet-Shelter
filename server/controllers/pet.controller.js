
const Pet = require("../models/pet.model");

class PetController {
    getAll(req, res) {
        Pet.find({}).sort({type:1})
            .then(pets => res.json(pets))
            .catch(err => res.json(err));
    }
    create(req, res) {
        let newPet = new Pet(req.body);
        newPet.save()
            .then( () => res.json({msg: "Pet added"}) )
            .catch( err => res.json(err) );
    }
    getOne(req,res) {
        Pet.findOne({_id: req.params._id})
            .then(pet => res.json(pet))
            .catch(err => res.json(err));
    }
    delete(req, res){
        Pet.findByIdAndDelete({_id: req.params._id})
            .then(() => res.json({msg: "Pet Deleted"})
            )
            .catch(err => res.json(err));
    }
    edit(req, res){
        Pet.findByIdAndUpdate({_id: req.params._id},req.body,{
            runValidators: true
        })
            .then(()=> res.json({msg: "Edit made"}))
            .catch(err => res.json(err));
    }
    addLikes(req,res) {
        Pet.updateOne({_id: req.params._id}, {$inc:{likes:1}})
            .then(() => res.json({msg:"pet liked"}))
            .catch(err => res.json(err));
    }
}


module.exports = new PetController();