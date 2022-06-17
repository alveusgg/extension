import mongoose from "mongoose";

const animalSchema = new mongoose.Schema({
    img: {
        data: Buffer,
        contentType: String
    },
    name: String,
    species: String,
    scientificName: String,
    sex: String,
    dateOfBirth: Date,
    story: String,
    conservationMission: String
},{
    timestamps: true
})

export const Animal = mongoose.model('animal', animalSchema)