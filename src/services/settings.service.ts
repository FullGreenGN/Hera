import { Settings } from "../db"

export async function createDefaultSettings() {
    return Settings.create({
        data: {
            slideTime: 5000,
            showAbsent: true,
            showPost: true
        }
    })
}

export async function getSlideTime() {
    return 500
}