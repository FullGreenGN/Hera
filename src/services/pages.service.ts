import { Post } from "../db"

export async function getPagesNumber() {
    return Post.count()
}

export async function getPagesEnabled() {
    return Post.findAll({
        where: {
            published: true
        }
    }).then((pages) => {
        console.log(pages.length)
        return pages.length
    })
}

export async function getPages() {
    return Post.findAll().then((pages) => {
        console.log(pages.length)
        return pages
    })
}