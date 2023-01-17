const multer = require('multer')
var path = require('path');

const maxSize = 2000 * 1000

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/upload')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.png')
  },
  onFileUploadStart: function (file, req, res) {
    if (req.files.file.length > maxSize) {
      return false;
    }
  }

})

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return cb(new Error('Only images are allowed'))
    }
    cb(null, true)
  },
  limits: {
    fileSize: maxSize
  }
}).single('photo');


module.exports = upload