const multer = require("multer");
const path= require("path");

const tempDir = path.dirname(__dirname,"../", "temp");

const multerConfig = multer.diskStorage({
    destination: tempDir,
   filename: (req,file,cd)=>{
    cd(null, file.originalname)
   }
});

const upload = multer({
    storage: multerConfig
});
 
module.exports = upload;