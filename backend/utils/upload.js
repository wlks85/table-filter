const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/temp');
    },
    filename: function (req, file, cb) {
      // console.log(decodeURIComponent(escape(file.originalname)))
      cb(null, Date.now() + '-' + decodeURIComponent(escape(file.originalname)));
    }
});

const upload = multer({ storage: storage });

module.exports = {upload};