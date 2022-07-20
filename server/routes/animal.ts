import express from 'express'
import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    }
    , filename: (req, file, cb) => {
        console.log("file: ", file);
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

export const router: express.Router = express.Router()

const {
    getAllAnimals, getAnimalByName, createAnimal, updateAnimalByName, deleteAnimalByName
} = require('../controllers/animals')

//get
router.get('/', getAllAnimals)
router.get('/:name', getAnimalByName)

//add
router.post('/', upload.single('img'), createAnimal)

//edit
router.patch('/:name', upload.single('img'), updateAnimalByName)

//delete
router.delete('/:name', deleteAnimalByName)