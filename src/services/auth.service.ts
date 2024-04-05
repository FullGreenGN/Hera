import { PrismaClient } from '../generated/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

export async function createUser(email: string, password: string) {
    const hasUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    }).then((user) => {
        return user
    })

    const hashedPassword = await hash(password, 10)

    return prisma.user.create({
        data: {
            email: email,
            name: email,
            password: hashedPassword
        }
    })
}

export async function getUser(email: string) {
    return prisma.user.findUnique({
        where: {
            email: email
        }
    })
}

export async function getUsers() {
    return prisma.user.findMany()
}

export async function deleteUser(email: string) {
    return prisma.user.delete({
        where: {
            email: email
        }
    })
}

export async function updateUser(email: string, password: string) {
    const hashedPassword = await hash(password, 10)

    return prisma.user.update({
        where: {
            email: email
        },
        data: {
            email: email,
            password: hashedPassword,
            name: email
        }
    })
}

