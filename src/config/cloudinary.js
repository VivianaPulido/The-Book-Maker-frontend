const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const multer = require('multer');
 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});
 
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'book-maker', // Este va a ser el nombre del folder en cloudinary
  allowedFormats: ['jpg', 'png'],
  params: { resource_type: 'raw' },
  filename: function (req, file, cb) {
    cb(null, file.originalname); //Con esto, el nombre del archo de cloudinary será el mismo que trae el archivo originalmente
  }
});

module.exports= multer({storage})

