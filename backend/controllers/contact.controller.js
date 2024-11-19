import Contacts from '../models/contact.model.js';


export const getContacts = async (req, res) => {
  try {
    const contacts = await Contacts.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getContactById = async (req, res) => {
  try {
    const contact = await Contacts.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const createContact = async (req, res) => {
  const { phone, adress } = req.body;

  const newContact = new Contacts({
    phone,
    adress,
  });

  try {
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const updateContact = async (req, res) => {
  try {
    const updatedContact = await Contacts.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const deleteContact = async (req, res) => {
  try {
    const deletedContact = await Contacts.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
