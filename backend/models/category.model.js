import mongoose from "mongoose"

const categorytSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,  
      }
});

export default mongoose.model("Category", categorytSchema);