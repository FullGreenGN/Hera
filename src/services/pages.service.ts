import { PrismaClient } from '../generated/client'

const prisma = new PrismaClient()

export async function getPagesNumber() {
    return prisma.post.count()
}

export async function getPagesEnabled() {
    return prisma.post.findMany({
        where: {
            published: true
        }
    }).then((pages) => {
        return pages.length
    })
}

export async function getPages() {
    return prisma.post.findMany().then((pages) => {
        return pages
    })
}