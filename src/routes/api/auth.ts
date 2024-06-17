import { Router } from 'express'
import { compare } from 'bcryptjs'
import jwt, { sign } from 'jsonwebtoken'
import variables from '../../config'
import { socketBroadcast } from '../../index'
import logger from '../../lib/logger'
import { User } from '../../db'

const router = Router()

// @ts-ignore
router.post('/login', async (req: Request, res: Response) => {
    // @ts-ignore
    const { email, password } = req.body;
    logger.info(`User attempting to login: ${email}`)

    try {
        const user = await User.findOne({
            where: { email },
        });

        if (!user) {
            socketBroadcast('Invalid Credentials', 'error')
            // @ts-ignore
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const passwordMatch = await compare(password, user.dataValues.password);

        if (!passwordMatch) {
            socketBroadcast('Invalid Credentials', 'error')
            // @ts-ignore
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = sign({ userId: user.dataValues.id }, variables.JWT_SECRET, { expiresIn: '1h' });

        // @ts-ignore
        await res.json({ token });
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ error: 'Failed to login' });
    }
});

export default router