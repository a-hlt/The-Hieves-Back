import jwt from 'jsonwebtoken'

<<<<<<< HEAD

=======
>>>>>>> 9fa3a92e60dfe1f431e9d6ca1eb6fa36f1fc98d2
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