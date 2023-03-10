import jwt from 'jsonwebtoken';
import { UnAuthenticationError } from '../Errors/index.js';

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization
    console.log(authHeader)
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnAuthenticationError('Authentication Invalid')
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: payload.userId }
        next()
    } catch (error) {
        throw new UnAuthenticationError('Authentication Invalid!')
    }
}

export default auth