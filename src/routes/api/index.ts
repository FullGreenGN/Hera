import { Router } from 'express'
import variables from '../../config'
import authRouter from './auth'
import pagesRouter from './pages'
import usersRouter from './users'

const router = Router()

router.use('/auth', authRouter)
router.use('/pages', pagesRouter)
router.use('/users', usersRouter)

router.get('/', (req: any, res: any) => {
    res.json({ message: variables.VERSION })
})

export default router