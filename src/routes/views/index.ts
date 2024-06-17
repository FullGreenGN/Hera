import { Router } from 'express'
import { getPages } from '../../services/pages.service'
import { getSlideTime } from '../../services/settings.service'
const router = Router()

router.get('/', async (req, res) => {
    let pagesArray: any = []
    let slideTime = 5000

    await getPages().then((pages: any) => {
        console.log(pages.length)
        pagesArray = pages.filter((page: any) => page.published)
    })


    res.render('pages/index', { posts: pagesArray, slideTime: slideTime });
});

export default router
