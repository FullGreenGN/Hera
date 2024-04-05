import { Router } from 'express'
import adminRouter from './views/admin'
import indexRouter from './views/index'
import authRouter from './views/auth'
import apiRouter from './api'

const router = Router()

router.use('/admin', adminRouter)
router.use('/auth', authRouter)
router.use('/api/v1', apiRouter)
router.use('/', indexRouter)

export default router
