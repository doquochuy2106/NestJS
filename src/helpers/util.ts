
const bcrypt = require('bcrypt')

const saltRounds = 10

export const hashPasswordHelper = async (plainPassWord: string) => {
    try {
        return await bcrypt.hash(plainPassWord, saltRounds)
    } catch (e) {
        console.log(e)
    }
}