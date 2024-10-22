import mongoose from "mongoose";

const ContactsSchema = new mongoose.Schema({
      phone: {
        type: String,
        required: true
      },
      adress: {
        type: String,
        required: true
       }
});

export default mongoose.model("Contacts", ContactsSchema);