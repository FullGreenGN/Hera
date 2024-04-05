import { PrismaClient } from '../generated/client'

const prisma = new PrismaClient()

export async function createDefaultSettings() {
    return prisma.settings.create({
        data: {
            slideTime: 5000,
            showAbsent: true,
            showPost: true
        }
    })
}

export async function getSlideTime() {
    return
}