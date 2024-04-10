import { Router } from 'express'
import { deleteUser, getUsers } from '../../services/auth.service'

const router = Router()

router.get('/', async (req: any, res: any) => {
    let usersList: never[] = []

    await getUsers().then((users: any) => {
        usersList = users
    })

    res.json({ message: usersList })
})

router.post('/delete/:id', async (req: any, res: any) => {
    const id = req.params.id

    await deleteUser(id).then(() => {
        res.redirect(301, '/admin/users')
    })
})

export default router