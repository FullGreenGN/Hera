import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function connect() {
    await prisma.$connect()
}

export default connect
