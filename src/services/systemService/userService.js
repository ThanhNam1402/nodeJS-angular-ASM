import db from '../../models/index';

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

let getAllUser = async (reqData) => {
    try {
        let res = {}
        let { count, rows } = await db.User.findAndCountAll({
            attributes: {
                exclude: ['password']
            },
            limit: Number(reqData.limit),
            offset: (Number(reqData.page) - 1) * Number(reqData.limit),
            order: [['id', 'DESC']],
            raw: true,
        });

        let pagination = {
            total: count,
            limit: Number(reqData.limit),
            page: Number(reqData.page),
        }

        res.pagination = pagination
        res.data = rows;
        res.success = true;
        res.message = 'success';

        return res

    } catch (error) {
        throw error
    }
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
                user.messageail = data.messageail;
                user.roleId = data.roleID;
                user.gender = data.gender;
                user.phone = data.phone;

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

module.exports = {
    getAllUser,
    delUser,
    editUser,
    getOneUser,
}