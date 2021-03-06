import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import lists from './routes/api/lists.js'
import users from './routes/api/users.js'

const app = express()
dotenv.config()

const PORT = process.env.PORT || 5000

app.use(express.json({extended: true}))
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use('/api/lists', lists)
app.use('/api/users', users)

app.get('*', (req, res) => {
    res.send('Hello from TodoMan!');
});

async function start() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`DB connected | Server up on PORT ${PORT}`))
    } catch(error) {
        console.log('Server Error', error.message)
        process.exit(1)
    }
}

start()
