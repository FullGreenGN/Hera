import { Router } from 'express'
import multer from 'multer'
import { randomUUID } from 'node:crypto'
import path from 'node:path'
import fs from 'fs'
import logger from '../../lib/logger'
import { Post } from '../../db'

const router = Router()

const upload = multer({
    dest: "uploads/"
});

const handleError = (err: any, res: any) => {
    res.render('pages/admin/index', { title: 'Admin', message: `Oops! Something went wrong! ${err}`, messageType: 'error'})
};

router.post("/new", upload.single("file"), (req, res) => {
        // @ts-ignore
        const tempPath = req.file.path;
        // @ts-ignore
        const imageName = Date.now() + '-' + randomUUID() + '-' + req.file.originalname;
        const targetPath = path.join(__dirname, "../../../public/uploads/" + imageName);

        if (path.extname(<string>req.file?.originalname).toLowerCase() === ".png" || path.extname(<string>req.file?.originalname).toLowerCase() === ".jpg" || path.extname(<string>req.file?.originalname).toLowerCase() === ".jpeg" || path.extname(<string>req.file?.originalname).toLowerCase() === ".gif"){
            fs.rename(tempPath, targetPath, err => {
                if (err) return handleError(err, res);

                Post.create({
                    title: req.body.name,
                    content: req.body.description,
                    image: imageName,
                    published: true,
                    color: req.body.color
                }).catch((error) => {
                    logger.error(error)
                })

                res.redirect('/admin')
            });
        } else {
            fs.unlink(tempPath, err => {
                if (err) return handleError(err, res);

                res.send({ message: 'Only .png files are allowed!', messageType: 'error'})
            });
        }
    }
);


router.delete('/delete/:id', (req, res) => {
    Post.destroy({
        where: {
            id: parseInt(req.params.id)
        }
    }).then((result) => {
        res.json({ message: 'Page deleted'})
    }).catch((error) => {
        res.json({ message: 'Error deleting page'})
    })
})

router.delete("/:id", (req, res) => {
    Post.destroy({
        where: {
            id: parseInt(req.params.id)
        }
    }).then((result) => {
        res.json({ message: 'Page deleted'})
    }).catch((error) => {
        res.json({ message: 'Error deleting page'})
    })
})

export default router