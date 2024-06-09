import express from "express";
import uploadMulter from "../middelware/uploadMulter";

import planController from "../controllers/systemController/planController";

let router = express.Router();

router.get('/plan/files', planController.getAllFiles);
router.post('/plan/files/upload', uploadMulter.array('file'), planController.addPlanFile);
router.get('/plan/file/download/:name', planController.downLoadFile);
router.delete('/plan/file/:id', planController.delPlanFile);




router.get('/plan', planController.getAll);
router.get('/plan/:id', planController.GetOne);
router.post('/plan/add', planController.Creat);
router.delete('/plan/delete/:id', planController.Delete);
router.put('/plan/update/:id', planController.Update);
router.put('/plan/update/:id', planController.Update);





export const PlanRouter = router