import mongoose from "mongoose";

const animalSchema = new mongoose.Schema({
    img: String,
    name: String,
    species: String,
    scientificName: String,
    sex: String,
    dateOfBirth: mongoose.Schema.Types.Mixed,
    iucnStatus: String,
    story: String,
    conservationMission: String
},{
    timestamps: true
})

export const Animal = mongoose.model('ambassadors', animalSchema)