

import jwt from "jsonwebtoken";

const createTokenJWT = (payload) => {

    let key = process.env.JWT_TOKEN_SECRET

    const jwtToken = jwt.sign(payload, key, { expiresIn: '1h' });

    console.log("jwtToken : ", jwtToken)

    return jwtToken
}

const verifyTokenJWT = (token) => {
    console.log("verify token");
    let key = process.env.JWT_TOKEN_SECRET
    let data = null
    try {
        let decoded = jwt.verify(token, key);
        data = decoded

        console.log(data);
    } catch (err) {
        console.log(err);
    }

    return data
}

const checkTokenJWT = (req, res, next) => {

    console.log("res header", req.headers.authorization);

    let token = req.headers.authorization?.slice(7)

    console.log("token", token);


    if (token) {
        let decoded = verifyTokenJWT(token)

        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: 'Token is expired'
            })
        }
        next()
    } else {
        return res.status(401).json({
            success: false,
            message: 'Bạn Cần Đăng Nhập Để Thực Hiện Yêu Cầu Này'
        })
    }

}


module.exports = {
    createTokenJWT,
    verifyTokenJWT,
    checkTokenJWT,
}