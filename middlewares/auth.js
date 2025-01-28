import jwt from 'jsonwebtoken'


export default (req, res, next) => {
    let token = req.headers?.authorization

    if (!token) {
        return res.status(400).json({message: 'No token provided'})
    }

    token = token.replace('Bearer ', '')
    console.log("auth middlewares token:" + token)

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded
    } catch {
        return res.status(401).json({message: 'Unauthorized: Invalid token'})
    }

    next()
}