import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  writer: {
    type: String,
    required: true,
    trim: true,
  },
  
  price: {
    type: Number,
    required: true,
    default: 0.0,
  },
  
  description: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },
  

  rating: {
    type: Number,
    required: true,
    default: 0,
  },

   imageUrl:{
    type: String,
    required: true,
   }
});

export default mongoose.model("Product", productSchema);