const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
})

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname)
        if(ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !== ".mp4" && ext !== ".mp3") {
            return cb(new Error("file type is not supported.", false))
        }
        cb(null, true)
    }
})

module.exports = upload