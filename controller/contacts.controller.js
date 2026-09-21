import Contact from '../models/contact.model.js'
import mongoose from 'mongoose'

export const getAddContacts = async (req, res) => {
  try {
    const contacts = await Contact.find()
    // res.json(contacts)
    res.render("home", { contacts: contacts })
  } catch (error) {
    res.render("500", { message: error })
  }
}

export const getAddContact = (req, res) => {
  res.render('add-contact')
}

export const postAddContact = async (req, res) => {
  // res.send(req.body)

  try {
    const upcontact = await Contact.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
    })
    res.redirect('/')
  } catch (error) {
    res.render("500", { message: error })
  }


}

export const getShowContact = async (req, res) => {

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.render("404", { message: "Invalid Id" })
  }

  try {
    const upcontact = await Contact.findById(req.params.id)
    if (!upcontact) return res.render("404", { message: "Contact not found" })
    return res.render('show-contact', { upcontact: upcontact })
  } catch (error) {
    res.render("500", { message: error })
  }

}

export const getUpdateContact = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.render("404", { message: "Invalid Id" })
  }
  try {
    const upcontact = await Contact.findById(req.params.id)
    if (!upcontact) return res.render("404", { message: "Invalid Id" })
    res.render('update-contact', { upcontact: upcontact })
  } catch (error) {
    res.render("500", { message: error })
  }
}

export const postUpdateContact = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.render("404", { message: "Invalid Id" })
  }

  try {
    const upcontact = await Contact.findByIdAndUpdate(req.params.id, {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
    })

    if (!upcontact) return res.render("404", { message: "Invalid Id" })
    res.redirect('/')
  } catch (error) {
    res.render("500", { message: error })
  }
  // const {first_name, last_name, email,phone,address} = req.body //body se jis sequence me data aarha h usi sequence me model wala name likhna h
  // await Contact.findByIdAndUpdate(req.params.id,{first_name, last_name, email,phone,address})

  // await Contact.findByIdAndUpdate(req.params.id, req.body) //req.body tab use krna h jab from field ka name and model ka name same ho tb


}

export const deleteContact = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.render("404", { message: "Invalid Id" })
  }
  try {
    const decontact = await Contact.findByIdAndDelete(req.params.id)

    if (!decontact) return res.render("404", { message: "Invalid Id" })
    res.redirect('/')
  } catch (error) {
    res.render("500", { message: error })
  }
}

// video no 13  20 minutes  