import multer from "multer";
import path from "path";


const storageConfig = multer.diskStorage({
    destination: (req, file, next) => {
        next(null, "./src/public/uploads");
    },
    filename: (req, file, next) => {
        next(null, `${Date.now()}_${file.originalname}`);
    },
});


export const uploader = multer({ storage: storageConfig });