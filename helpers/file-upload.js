const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: 'dbcw1layw',
  api_key: 169187941582435,
  api_secret: 'FCZRF1xjlGBr7F--dY3gRs4L47Y'
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'demo',
  allowedFormats: ['jpg', 'png']
});

const parser = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    console.log(file.mimetype === 'image/jpeg');
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      req.fileValidationError = true;
      return cb(null, false, new Error('Wrong file type uploaded'));
    }
    cb(null, true);
  }
});

module.exports = parser
;
