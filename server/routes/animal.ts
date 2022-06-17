import express from 'express'

export const router: express.Router = express.Router()

const {
    getAllAnimals, getAnimalByName, createAnimal, updateAnimalByName, deleteAnimalByName
} = require('../controllers/animals')

//get
router.get('/', getAllAnimals)
router.get('/:name', getAnimalByName)

//add
router.post('/', createAnimal)

//edit
router.patch('/:name', updateAnimalByName)

//delete
router.delete('/:name', deleteAnimalByName)