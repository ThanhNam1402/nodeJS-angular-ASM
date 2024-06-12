

import authService from '../services/authService';

// login 
let handleLogin = async (req, res) => {
    try {
        let { email, password } = req.body;

        if (!email || !password) {
            return res.status(422).json({
                success: false,
                message: 'Thiếu trường email hoặc password'
            })
        }

        let data = await authService.handleLogin(email, password)

        if (data && data.success !== true) {
            return res.status(422).json({
                ...data
            });
        }

        // set cookie token, bỏ cũng đc 
        if (data && data.success === true) {

            res.cookie('accessToken', data.data.token, { httpOnly: true })

            return res.status(200).json({
                ...data
            });
        }

    } catch (error) {
        return res.status(403).json({
            errors: error.message
        })
    }
}

// refresh token 
const handleRefreshToken = async (req, res) => {
    try {
        let rfToken = req.query.token

        let data = await authService.handelCheckRefreshToken(rfToken)

        console.log(data);
        if (data && data.success === true) {
            res.cookie('accessToken', data.data.token, { httpOnly: true })

            return res.status(200).json({
                ...data
            })
        }

        if (data && data.success === false) {
            return res.status(401).json({
                ...data
            })
        }


    } catch (error) {
        console.log(error.message);
    }

}

// get account user 
let handleGetAccount = async (req, res) => {
    try {

        let data = await authService.getAccount(req.body.token);

        return res.status(200).json({
            ...data
        })

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Phiên Đăng Nhập Không Hợp Lệ, Vui Lòng Nhập Lại"
        })

    }
}



module.exports = {
    handleGetAccount: handleGetAccount,
    handleRefreshToken: handleRefreshToken,
    handleLogin: handleLogin,
    // handleLogout: handleLogout
}