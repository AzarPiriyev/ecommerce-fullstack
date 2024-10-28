import mongoose from "mongoose";

const informSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    content: {
        type: String,
        required: true,
    },

    code: {
        type: String, 
        required: true,
    }
});

export default mongoose.model("İnform", informSchema);
