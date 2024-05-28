import express from "express";


import planController from "../controllers/systemController/planController";

let router = express.Router();

router.get('/plan', planController.getAll);
router.get('/plan/:id', planController.GetOne);
router.delete('/delete/:id', planController.Delete);

export const PlanRouter = router