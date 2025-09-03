const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware')
const multer = require('multer')
const captionController= require("../controllers/caption.controller")

// /post/api/[Protected] {image-file}firstly we will verify the user only than he can make a post

const upload = multer({storage:multer.memoryStorage()})

router.post('/create', authMiddleware , upload.single("image"), captionController.createCaptionController)

router.get('/getCaption', authMiddleware, captionController.getCaptionsController);

router.delete('/delete/:id',authMiddleware,captionController.deleteCaptionController)

router.patch('/save/:captionId',authMiddleware,captionController.saveCaptionController)

module.exports = router;  