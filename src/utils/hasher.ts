import bcrypt from "bcryptjs"

const saltRounds = 10;

export const hash = async (password: string) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedpassword = await bcrypt.hash(password, salt);
    return hashedpassword;
}

export const compare = async (password: string, hashedpassword: string) => {
    return await bcrypt.compare(password, hashedpassword);
}