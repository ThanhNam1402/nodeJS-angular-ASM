
import userService from "../../services/systemService/userService"

let getAllUsers = async (req, res) => {
    try {
        console.log(req.query);
        let data = await userService.getAllUser(req.query);

        return res.status(200).json({
            ...data
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
}

let addUser = async (req, res) => {
    try {
        let dataReq = req.body

        console.log(dataReq);
        let data = await userService.createUser(dataReq)

        if (data.success !== true) {
            return res.status(400).json({
                ...data
            })
        }
        return res.status(200).json({
            ...data
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
}

let getOneUser = async (req, res) => {
    try {
        let { id } = req.params
        let data = await userService.getOneUser(id);
        return res.status(200).json({
            ...data
        })

    } catch (error) {
        return res.status(500).json({
            error
        })
    }
}

let delUser = async (req, res) => {
    try {

        let { id } = req.params

        let data = await userService.delUser(id)

        if (data && data.success) {
            return res.status(200).json({
                ...data
            })
        } else {
            return res.status(404).json({
                ...data
            })
        }
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
}

let updateUser = async (req, res) => {
    try {
        let dataReq = req.body
        let data = await userService.editUser(dataReq)
        if (data && data.success) {
            return res.status(200).json({
                ...data
            })
        } else {
            return res.status(404).json({
                ...data
            })
        }
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
}


module.exports = {
    getOneUser,
    getAllUsers,
    addUser,
    updateUser,
    delUser
}