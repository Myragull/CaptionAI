const mongoose = require("mongoose");

const captionSchema = new mongoose.Schema({
  imageUrl: 
  {
    type: String,
     required: true 
  },       // ImageKit URL
  captionText:
   {
     type: String,
     required: true 
    },    // Gemini caption
  hashtags: 
   [{ 
    type: String 
}],                     // extracted from Gemini caption
  createdBy:
   {
     type: mongoose.Schema.Types.ObjectId, 
     ref: "user", 
     required: true 
    },
  savedBy: 
  [{ 
    type: mongoose.Schema.Types.ObjectId,
     ref: "user" 
    }], // users who saved this caption
}, { 
    timestamps: true 
    })


const captionmodel=mongoose.model("caption",captionSchema);

module.exports = captionmodel