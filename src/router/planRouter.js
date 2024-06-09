import express from "express";


import planController from "../controllers/systemController/planController";

let router = express.Router();

router.get('/plans', planController.getAll);
router.get('/plans/:id', planController.GetOne);
router.post('/plans/add', planController.Creat);
router.delete('/plans/delete/:id', planController.Delete);
router.put('/plans/update/:id', planController.Update);
export const PlanRouter = router