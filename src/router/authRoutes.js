


import express from "express";
import authController from "../controllers/authController"

let router = express.Router();


router.post('/login', authController.handleLogin);
// router.get('/logout', authController.getOneDraft);


export const authRoutes = router