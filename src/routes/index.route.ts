import { Router } from 'express';
import { Photo } from '../models/photo.model';
import multer from 'multer';
import path from 'path';


const router = Router();


// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../images'))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname)
    }
})
const upload = multer({ storage })




// Routes
router.get('/', async (req, res, next) => {
    try {
        const photos = await Photo.find();
        console.log(photos)
        res.render('index', { photos });
    } catch (err) {
        console.error(err);
        next(err)
    }
})

router.post('/', upload.single('file'), async (req, res, next) => {
    try {
        const photo = new Photo({
            title: req.body.title,
            path: req.file?.filename
        })
        await photo.save()
        res.redirect('/');

    } catch (err) {
        console.error(err);
        next(err)
    }
}
)

export default router;