const mongoose = require("mongoose");


const PetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Pet needs a name"],
        minlength: [3, "name has to be at least 3 letters"]
    },
    type: {
        type: String,
        required: [true, "Pet need a type"],
        min: [3, "type has to be at least 3 letters"]
    },
    desc: {
        type: String,
        required: [true, "desc is needed"],
        minlength: [3, "desc needs to be at least 3 letters"]
    },
    skill_1: {
        type: String
    },
    skill_2: {
        type: String
    },
    skill_3: {
        type: String
    },
    likes: {
        type: Number,
        required: [true, "need likes"],
        min: [-1]
    }
}, {timestamps: true});

module.exports = mongoose.model("Pet", PetSchema);