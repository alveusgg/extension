import express from 'express'
import multer from 'multer'

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

export const router: express.Router = express.Router()

const {
    getAllAnimals, getAnimalById, createAnimal, updateAnimalById,  deleteAnimalById
} = require('../controllers/animals')

//get
router.get('/', getAllAnimals)
router.get('/:id', getAnimalById)

//add
router.post('/', upload.single('img'), createAnimal)

//edit
router.patch('/:id', upload.single('img'), updateAnimalById)

//delete
router.delete('/:id', upload.single('img'), deleteAnimalById)