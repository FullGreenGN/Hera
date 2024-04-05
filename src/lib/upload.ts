import multer from 'multer';
import { v4 } from 'uuid'
import path from 'node:path'

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, 'uploads/');
    },
    filename: (req: any, file:any, cb: any) => {
        cb(null, Date.now() + '-' + v4 + '-' + file.originalname);
    },
});

// Create the multer instance
const upload = multer({ dest: 'uploads/' });
export default upload;