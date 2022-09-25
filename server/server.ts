import mongoose from 'mongoose';
import express, {Application} from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import 'dotenv/config'

import {router} from './routes/animal'

const app: Application = express()

app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

const whitelist = ['*']

app.use(cors({
    // origin: function(origin, callback){
    //     if(whitelist.indexOf(origin as string) !== -1){
    //         callback(null, true)
    //     }
    //     else{
    //         callback(new Error('Not allowed by CORS'))
    //     }
    // }
}))

app.use('/api/animals', router)
app.use('/images', express.static('uploads'))//make images publicly available to the frontend

const port = process.env.PORT || 3000
mongoose.connect(process.env.DB_CONNECTION as string, {dbName: 'Alveus'})
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        }
    )}).catch((err: Error) => {
        console.log(err)
    })