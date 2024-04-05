import { Router } from 'express'
import { PrismaClient} from '../../generated/client'
import { compare } from 'bcryptjs'
import jwt, { sign } from 'jsonwebtoken'
import variables from '../../config'
import { socketBroadcast } from '../../index'
import logger from '../../lib/logger'

const router = Router()
const prisma = new PrismaClient()

// @ts-ignore
router.post('/login', async (req: Request, res: Response) => {
    // @ts-ignore
    const { email, password } = req.body;
    logger.info(`User attempting to login: ${email}`)

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            socketBroadcast('Invalid Credentials', 'error')
            // @ts-ignore
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            // @ts-ignore
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = sign({ userId: user.id }, variables.JWT_SECRET, { expiresIn: '1h' });

        // @ts-ignore
        await res.json({ token });
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ error: 'Failed to login' });
    }
});

export default router