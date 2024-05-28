


import express from "express";


import { authRoutes } from "./authRoutes";
import { userRoutes } from "./userRoutes";

let router = express.Router();

router.use('/auth', authRoutes)
router.use('/', userRoutes)

export const routerSystem = router