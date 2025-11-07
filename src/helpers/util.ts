
const bcrypt = require('bcrypt')

const saltRounds = 10

export const hashPasswordHelper = async (plainPassWord: string) => {
    try {
        return await bcrypt.hash(plainPassWord, saltRounds)
    } catch (e) {
        console.log(e)
    }
}

export const comeparePasswordHelper = async (plainPassword: string, hasPassword: string) => {
    try {
        return await bcrypt.compare(plainPassword, hasPassword)
    } catch (e) {
        console.log(e)
    }
}