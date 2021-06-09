const express = require('express'),
      router = express.Router(),
      cloudinary = require("../utils/cloudinary"),
      upload = require("../utils/multer");
      
const uploadsFolder = 'social-app';

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const uploadedImg = await cloudinary.uploader.upload(req.file.path, { folder: uploadsFolder });
    res.status(201).json({ message: 'Success', image: { publicId: uploadedImg.public_id.split("/")[1], url: uploadedImg.secure_url } });
  } catch (err) {
    console.log(err);
    res.json({ message: 'error' });
  }}); 

router.delete('/:imageId', async (req, res, next) => {
    const imageId = req.params.imageId;
    try {
        await cloudinary.uploader.destroy(`uploadsFolder/${imageId}`);
        res.status(200).json({ message: 'Success' });
      } catch (err) {
        console.log(err);
        next(err);
      };
})

module.exports = router;