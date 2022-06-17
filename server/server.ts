import mongoose from 'mongoose';
import express, {Application} from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import 'dotenv/config'

import {router} from './routes/animal'

const app: Application = express()

app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

const allowedOrigins = ['http://localhost:3000']

const options: cors.CorsOptions = {
  origin: allowedOrigins
}
app.use(cors(options))

app.use('animals', router)

const port = process.env.PORT || 3000
mongoose.connect(process.env.DB_CONNECTION as string, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        }
    )}).catch((err: Error) => {
        console.log(err)
    })
mongoose.set('useFindAndModify', false)