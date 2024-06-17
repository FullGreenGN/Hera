import { User } from '../db'
import { hash } from 'bcryptjs'

export async function createUser(email: string, password: string) {
    const hasUser = await User.findOne({
        where: {
            email: email
        }
    }).then((user) => {
        return user
    })

    const hashedPassword = await hash(password, 10)

    return User.create({
        data: {
            email: email,
            name: email,
            password: hashedPassword
        }
    })
}

export async function getUser(email: string) {
    return User.findOne({
        where: {
            email: email
        }
    })
}

export async function getUsers() {
    return User.findAll()
}

export async function deleteUser(id: string) {
    // check if user > 1
    const users = await User.findAll()
    if (users.length <= 1) {
        return Promise.reject('Cannot delete the last user')
    }

    return User.destroy({
        where: {
            id: parseInt(id)
        }
    })
}

export async function updateUser(email: string, password: string) {
    const hashedPassword = await hash(password, 10)

    return User.update({email: email, password: hashedPassword, name: email}, {where: {email: email}})
}

