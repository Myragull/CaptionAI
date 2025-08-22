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

module.exports = {createCaptionController}