import jwt from 'jsonwebtoken'

const generateToken = (_id: string, role: string): string => {
    return jwt.sign({ _id, role }, process.env.SECRET, {
        expiresIn: '2d',
    })
}

export default generateToken
