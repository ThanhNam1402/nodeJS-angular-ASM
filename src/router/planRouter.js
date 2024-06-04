import express from "express";


import planController from "../controllers/systemController/planController";

let router = express.Router();

router.get('/plan', planController.getAll);
router.get('/plan/:id', planController.GetOne);
router.post('/plan/add', planController.Creat);
router.delete('/plan/delete/:id', planController.Delete);
router.put('/plan/update/:id', planController.Update);
export const PlanRouter = router