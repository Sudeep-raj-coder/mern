import express from "express"
import mongoose from 'mongoose'
import Contact from './models/contact.model.js'

const app = express()

// Database Connection

mongoose.connect('mongodb://127.0.0.1:27017/contacts-crud').then(() => {
  console.log('Database Connected')
})



//Middleware
app.set("view engine", "ejs")

app.use(express.urlencoded({ extended: false })) //from ke data ko accept krne ke liye

app.use(express.static('public'))


// Routes

app.get('/', async (req, res) => {

  const contacts = await Contact.find()
  // res.json(contacts)
  res.render("home", { contacts: contacts })

})


app.get('/add-contact', (req, res) => {
  res.render('add-contact')
})

app.post('/add-contact', async (req, res) => {
  // res.send(req.body)

  await Contact.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
  })
  res.redirect('/')
})


app.get('/show-contact/:id', async (req, res) => {
  const upcontact = await Contact.findById(req.params.id)
  res.render('show-contact', { upcontact: upcontact })
})

app.get('/update-contact/:id', async (req, res) => {
  const upcontact = await Contact.findById(req.params.id)
  res.render('update-contact', { upcontact: upcontact })
})

app.post('/update-contact/:id', async (req, res) => {

  await Contact.findByIdAndUpdate(req.params.id, {

    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
  })
  res.redirect('/')
})



app.get('/delete-contact/:id', async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id)
  res.redirect('/')
})


app.listen(3000, () => {
  console.log("Server start successfully on 3000.")
})

