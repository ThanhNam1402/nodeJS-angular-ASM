


import express from "express";


import { authRoutes } from "./authRoutes";
import { userRoutes } from "./userRoutes";
import { PlanRouter } from "./planRouter";
import {specialized} from './specializedRouter';
let router = express.Router();

router.use('/auth', authRoutes)
router.use('/', userRoutes)
router.use('/', PlanRouter)
router.use('/', specialized)
export const routerSystem = router