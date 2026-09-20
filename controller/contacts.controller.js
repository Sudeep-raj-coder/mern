import Contact from '../models/contact.model.js'
import mongoose from 'mongoose'

export const getAddContacts = async (req, res) => {
  const contacts = await Contact.find()
  // res.json(contacts)
  res.render("home", { contacts: contacts })
}

export const getAddContact = (req, res) => {
  res.render('add-contact')
}

export const postAddContact = async (req, res) => {
  // res.send(req.body)
  await Contact.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
  })
  res.redirect('/')
}

export const getShowContact = async (req, res) => {

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.render("404", { message: "Invalid Id" })
  }
  const upcontact = await Contact.findById(req.params.id)
  res.render('show-contact', { upcontact: upcontact })
}

export const getUpdateContact = async (req, res) => {
  const upcontact = await Contact.findById(req.params.id)
  res.render('update-contact', { upcontact: upcontact })
}

export const postUpdateContact = async (req, res) => {
  // const {first_name, last_name, email,phone,address} = req.body //body se jis sequence me data aarha h usi sequence me model wala name likhna h
  // await Contact.findByIdAndUpdate(req.params.id,{first_name, last_name, email,phone,address})

  // await Contact.findByIdAndUpdate(req.params.id, req.body) //req.body tab use krna h jab from field ka name and model ka name same ho tb

  await Contact.findByIdAndUpdate(req.params.id, {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
  })
  res.redirect('/')
}

export const deleteContact = async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id)
  res.redirect('/')
}