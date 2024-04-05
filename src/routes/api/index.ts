import { Router } from 'express'
import variables from '../../config'
import authRouter from './auth'
import pagesRouter from './pages'

const router = Router()

router.use('/auth', authRouter)
router.use('/pages', pagesRouter)

router.get('/', (req: any, res: any) => {
    res.json({ message: variables.VERSION })
})

export default router