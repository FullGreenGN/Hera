import { getPages, getPagesEnabled, getPagesNumber } from '../../services/pages.service'
import { Router } from 'express'
import variables from '../../config'
import { deleteUser, getUsers } from '../../services/auth.service'

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
        title: variables.APP_NAME,
        message: "",
        messageType: "success",
        pagesAvailable: pages,
        pagesEnabled: pageEnabled,
        pagesNumber: pages,
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

    let pages = 0

    await getPagesNumber().then((number: any) => {
        pages = number
    })

    res.render('pages/admin/editPages', {
        title: 'Admin Page',
        message: "",
        messageType: "success",
        pagesAvailable: pagesNum,
        pagesEnabled: pageEnabled,
        posts: pagesArray,
        pagesNumber: pages,
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

router.get('/users/', async (req: any, res: any) => {
    let users: never[] = []

    await getUsers().then((usersList: any) => {
        users = usersList
    })

    function formatDate(date: Date): string {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} - ${hours}:${minutes}`;
    }

    users.forEach((user: any) => {
        user.lastLogin = formatDate(new Date(user.lastLogin))
    })

    let pages = 0

    await getPagesNumber().then((number: any) => {
        pages = number
    })

    res.render('pages/admin/users', {
        title: 'Hera',
        message: "",
        messageType: "success",
        active: 'users',
        users: users,
        pagesNumber: pages,
        breadcrumbs: [
            {
                name: 'Admin',
                link: '/admin',
                icon: 'fa fa-home'
            },
            {
                name: 'Users',
                link: '/admin/users',
                icon: 'fa fa-users'
            }
        ]
    })
})

export default router
