import express from 'express'
import { getAddContacts, getAddContact, postAddContact, getShowContact, getUpdateContact, postUpdateContact, deleteContact } from '../controller/contacts.controller.js'
const router = express.Router()

router.get('/', getAddContacts)

router.get('/add-contact', getAddContact)

router.post('/add-contact', postAddContact)


router.get('/show-contact/:id', getShowContact)

router.get('/update-contact/:id', getUpdateContact)

router.post('/update-contact/:id', postUpdateContact)

router.get('/delete-contact/:id', deleteContact)

export default router