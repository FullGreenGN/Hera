import { getPages, getPagesEnabled, getPagesNumber } from '../../services/pages.service'
import { Router } from 'express'

const router = Router()

router.get('/', async (req: any, res: any) => {
    let pages = 0
    await getPagesNumber().then((number: any) => {
        pages = number
    })

    let pageEnabled = 0

    await getPagesEnabled().then((pages: any) => {
        pageEnabled = pages
    })

    res.render('pages/admin/index', {
        title: 'Admin Page',
        message: "",
        messageType: "success",
        pagesAvailable: pages,
        pagesEnabled: pageEnabled,
        active: 'home',
        breadcrumbs: [
            {
                name: 'Admin',
                link: '/admin',
                icon: 'fa fa-home'
            },
            {
                name: 'Home',
                link: '/admin',
                icon: 'fa fa-dashboard'
            }
        ]
    })
})

router.get('/pages/edit', async (req: any, res: any) => {
    let pagesNum = 0
    await getPagesNumber().then((number: any) => {
        pagesNum = number
    })

    let pageEnabled = 0

    await getPagesEnabled().then((pages: any) => {
        pageEnabled = pages
    })

    let pagesArray: any = []

    await getPages().then((pages: any) => {
        pagesArray = pages
    })

    res.render('pages/admin/editPages', {
        title: 'Admin Page',
        message: "",
        messageType: "success",
        pagesAvailable: pagesNum,
        pagesEnabled: pageEnabled,
        posts: pagesArray,
        active: 'editpages',
        breadcrumbs: [
            {
                name: 'Admin',
                link: '/admin',
                icon: 'fa fa-home'
            },
            {
                name: 'Pages',
                link: '/admin/',
                icon: 'fa fa-file'
            },
            {
                name: 'Edit',
                link: '/admin/pages/edit',
                icon: 'fa-solid fa-pen-to-square'
            }
        ]
    })
})


export default router
