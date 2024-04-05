import { Router } from 'express'
import { getPages } from '../../services/pages.service'
const router = Router()

router.get('/', async (req, res) => {
    let pagesArray: any = []

    await getPages().then((pages: any) => {
        pagesArray = pages.filter((page: any) => page.published)
    })

    res.render('pages/index', { posts: pagesArray, slideTime: 5000 });
});

export default router
