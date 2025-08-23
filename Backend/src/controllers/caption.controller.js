const generateCaption = require("../service/ai.service");
const captionmodel = require("../models/caption.model");
const apiError = require("../utils/apiError");
const uploadFile = require("../service/storage.service");
const extractCaptionAndHashtags = require("../utils/extract.helper");
const {v4:uuidv4} = require("uuid")


async function createCaptionController(req,res,next) {
    try {
   // step 1 : confirm that file is received
    const file =  req.file 
    console.log("file received",file);

  //step 2 : convert the image to base64  
    const base64Image =  Buffer.from(file.buffer).toString('base64')

  // step 3: Generate caption from AI
    const aiResponse =await generateCaption(base64Image);
    console.log("Generated Caption:",aiResponse)

  // Step 4: Extract caption + hashtags
    const { captionText, hashtags } = extractCaptionAndHashtags(aiResponse);

    
  // Step 5: Upload image to ImageKit
    const result = await uploadFile(file.buffer,`${uuidv4()}`);

   // step 6 : store data in database
    const caption = await captionmodel.create({
      imageUrl: result.url,
      captionText,
      hashtags,
      createdBy: req.user._id,
    })

    res.status(201).json({
    message:"caption created successfully",
    caption
    })
    } catch (error) {
        next(new apiError(500, "Internal server error", error.message));
    }
   
}


async function deleteCaptionController(req,res,next){
 try {
    const captionId = req.params.id;

    // Step 1: Find caption
    const caption = await captionmodel.findById(captionId);

    if (!caption) {
      return res.status(404).json({ message: "Caption not found" });
    }

    // Step 2: Ensure only creator can delete
    if (caption.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not authorized to delete this caption" });
    }

    // Step 3: Delete from DB
    await captionmodel.findByIdAndDelete(captionId);

    res.status(200).json({
      message: "Caption deleted successfully"
    });

  } catch (error) {
    next(new apiError(500, "Internal server error", error.message));
  }
}

async function saveCaptionController(req,res,next) {
  try {
    const { captionId } = req.params;
    const userId = req.user.id; // from auth middleware

    const captionDoc = await captionmodel.findById(captionId);
    if (!captionDoc) {
      return res.status(404).json({ message: "Caption not found" });
    }

    // check if already saved
    const alreadySaved = captionDoc.savedBy.includes(userId);

    if (alreadySaved) {
      // unsave (remove userId)
      captionDoc.savedBy.pull(userId);
    } else {
      // save (push userId)
      captionDoc.savedBy.push(userId);
    }

    await captionDoc.save();

    res.status(200).json({
      message: alreadySaved ? "Caption unsaved" : "Caption saved",
      captionDoc,
    });
  } catch (error) {
    next(error);
  }
};



module.exports = {createCaptionController,deleteCaptionController,saveCaptionController}