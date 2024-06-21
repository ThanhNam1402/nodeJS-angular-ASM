import db from '../../models/index';
import Sequelize from 'sequelize';

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

let apiurl = 'http://localhost:8181/api/users'
const limit = 3

const Op = Sequelize.Op;

let getAllUser = async (reqData) => {
    try {
        let res = {}

        let cond = {}
        if (reqData.keyword && reqData.keyword !== '') {
            cond = {
                name: {
                    [Op.like]: `%${reqData.keyword}%`
                }
            }
        }

        let { count, rows } = await db.User.findAndCountAll({
            where:
                cond
            ,
            attributes: {
                exclude: ['password']
            },
            limit: limit,
            offset: (Number(reqData.page) - 1) * limit,
            order: [['id', 'DESC']],
            raw: true,
        });

        if (!rows) {
            res.data = []
        } else {
            res.data = rows;

        }

        let pagination = {
            last_page: Math.ceil(count / limit),
            page: Number(reqData.page),
            apiUrl: apiurl
        }

        res.pagination = pagination
        res.success = true;
        res.message = 'success';

        return res

    } catch (error) {
        throw error
    }
}

let createUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    message: 'Email đã tồn tại',
                    success: false
                });
            }
            else {
                let hashPassword = await hashPass(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPassword,
                    name: data.name,
                    full_name: data.name,
                    gender: data.gender,
                    role_ID: data.role_ID,
                })
                resolve({
                    success: true,
                    message: 'Tạo Người Dùng Thành Công'
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}

let delUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: id },
                raw: false
            })

            if (!user) {
                resolve({
                    success: false,
                    message: "Erro !! Không tìm thấy người dùng"
                })
            } else {
                await user.destroy();
                resolve({
                    success: true,
                    message: "Thao Tác Thành Công !"
                })
            }
        } catch (error) {
            reject(error)
        }


    })

}

let editUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {


            console.log(data);
            if (!data.id) {
                resolve({
                    success: 1,
                    message: "Error !! Không tìm thấy user "
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.name = data.name;
                user.role_ID = data.role_ID,

                    await user.save();
                resolve({
                    success: true,
                    message: "Cập Nhật Thành Công !"
                });

            } else {
                resolve({
                    success: false,
                    message: "Error !! Lỗi Không Xác Định"
                });
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getOneUser = async (id) => {
    try {

        let res = {}

        let user = await db.User.findOne({
            where: { id: id },
            attributes: {
                exclude: ['password']
            },

            raw: true
        });

        if (user) {
            res.data = user;
            res.success = true;
            res.message = 'success';

        } else {
            res.success = false;
            res.message = 'Không tìm thấy người dùng';
        }
        return res

    } catch (error) {
        throw error
    }

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

// hass password
let hashPass = (pass) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hash = bcrypt.hashSync(pass, salt);
            resolve(hash);
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    getAllUser,
    delUser,
    editUser,
    getOneUser,
    createUser
}