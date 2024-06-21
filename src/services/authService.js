
import db from '../models/index';

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

import { createTokenJWT, verifyTokenJWT, createRefreshTokenJWT } from "../middelware/jwt";


let handleLogin = async (email, password) => {
    try {
        let userData = {};
        let isExist = await checkUserEmail(email);

        if (isExist) {
            let user = await db.User.findOne({
                where: { email: email },
                raw: true
            })

            if (user) {
                let check = bcrypt.compareSync(password, user.password);

                console.log(user);
                if (check) {
                    delete user.password;

                    userData.success = true;
                    userData.message = 'success'
                    userData.data = {
                        info: user,
                        token: createTokenJWT(user),
                    }

                } else {
                    userData.success = false;
                    userData.message = 'Nhập Sai Trường Password !'
                }
            }



        } else {
            userData.success = false;
            userData.message = 'Không tìm thấy Email Vui lòng thử lại !';
        }
        console.log(userData);

        return userData

    } catch (error) {
        console.log(error);
    }


}

const getAccount = async (token) => {
    try {
        let res = {}

        console.log("token", token);
        let verifyUser = verifyTokenJWT(token)

        let account = await db.Users.findOne({
            where: { id: verifyUser.id },
            attributes: {
                exclude: ['password']
            },
            raw: true
        })
        res.data = account;
        res.success = true;
        res.message = 'success';
        return res

    } catch (error) { throw error }
}

let checkUserEmail = (UserEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: UserEmail }
            });

            if (user) {
                resolve(true);
            } else {
                resolve(false)
            }

        } catch (error) {
            reject(error);
        }

    });
}


module.exports = {
    handleLogin,
    getAccount
}

