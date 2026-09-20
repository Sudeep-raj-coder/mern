import express from "express"
import ContactRoutes from './routes/contacts.route.js'
import { connectDB } from './config/databse.js'

connectDB()
const app = express()
const PORT = process.env.PORT

//Middleware
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: false })) //from ke data ko accept krne ke liye
app.use(express.static('public'))

// Routes
app.use('/', ContactRoutes)

app.listen(PORT, () => {
  console.log(`Server start successfully on ${PORT}`)
})

