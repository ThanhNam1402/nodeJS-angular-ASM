


import express from "express";


import userController from "../controllers/systemController/userController";

let router = express.Router();

router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getOneUser);
router.post('/users/new', userController.addUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.delUser);


export const userRoutes = router