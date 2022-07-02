import express from "express";
import { Animal } from "../models/animals";


exports.getAllAnimals = async (req: express.Request, res: express.Response) => {
    try {
        const animals = await Animal.find();
        res.status(200).json(animals);
    }catch(err){
        res.status(500).json({message: err});
    }
}

exports.getAnimalByName = async (req: express.Request, res: express.Response) => {
    try {
        const animal = await Animal.findOne({name: req.params.name});
        res.status(200).json(animal);
    }catch(err){
        res.status(500).json({message: err});
    }
}

exports.createAnimal = async (req: express.Request, res: express.Response) => {
    try {
        const animal = new Animal({
            ...req.body,
            img: req.file? req.file.filename: null
        });
        await animal.save();
        res.status(201).json(animal);
    }catch(err){
        res.status(500).json({message: err});
    }
}

exports.updateAnimalByName = async (req: express.Request, res: express.Response) => {
    try {
        const animal = await Animal.findOneAndUpdate({name: req.params.name}, req.body, {new: true});
        res.status(200).json(animal);
    }catch(err){
        res.status(500).json({message: err});
    }
}

exports.deleteAnimalByName = async (req: express.Request, res: express.Response) => {
    try {
        await Animal.findOneAndDelete({name: req.params.name});
        res.status(200).json({message: "Animal deleted"});
    }catch(err){
        res.status(500).json({message: err});
    }
}