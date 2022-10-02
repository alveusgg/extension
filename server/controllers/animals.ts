import express from "express";
import { Animal } from "../models/animals";
import {v2 as cloudinary} from "cloudinary";

//set up image upload
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

exports.getAllAnimals = async (req: express.Request, res: express.Response) => {
    try {
        const animals = await Animal.find();
        res.status(200).json(animals);
    }catch(err){
        res.status(500).json({message: err});
    }
}

exports.getAnimalById = async (req: express.Request, res: express.Response) => {
    try {
        const animal = await Animal.findOne({_id: req.params.id});
        res.status(200).json(animal);
    }catch(err){
        res.status(500).json({message: err});
    }
}

exports.createAnimal = async (req: express.Request, res: express.Response) => {
    try {
        if(req.file)
            cloudinary.uploader.upload(req.file.path, {folder: "/Alveus Ambassadors"}, async (err, _) => {
                if(err){
                    res.status(500).json({message: err});
                }
            }).then(async (result) => {
                const animal = new Animal({
                    ...req.body,
                    img: result.secure_url
                });
                await animal.save();
                res.status(201).json(animal);
            })
        else    
            new Error("No image provided");
    }catch(err){
        res.status(500).json({message: err});
    }
}

exports.updateAnimalById = async (req: express.Request, res: express.Response) => {
    try {
        if(req.file)
            cloudinary.uploader.upload(req.file.path, {folder: "/Alveus Ambassadors", overwrite: true}, async (err, _) => {
                if(err){
                    res.status(500).json({message: err});
                }
            }).then(async (result) => {
                const animal = await Animal.findOneAndUpdate({_id: req.params.id}, {
                    ...req.body,
                    img: result.secure_url
                }, {new: true});
                res.status(200).json(animal);
            })
        else
            new Error("No image provided");

    }catch(err){
        res.status(500).json({message: err});
    }
}

exports.deleteAnimalById = async (req: express.Request, res: express.Response) => {
    try {
        await Animal.findOneAndDelete({_id: req.params.id});
        res.status(200).json({message: "Animal deleted"});
    }catch(err){
        res.status(500).json({message: err});
    }
}