import express from "express";
import uploadMulter from "../middelware/uploadMulter";

import planController from "../controllers/systemController/planController";

let router = express.Router();

router.get('/plan/files', planController.getAllFiles);
router.post('/plan/files/upload', uploadMulter.array('file'), planController.addPlanFile);
router.get('/plan/file/download/:name', planController.downLoadFile);
router.delete('/plan/file/:id', planController.delPlanFile);



router.get('/plans', planController.getAll);
router.get('/plans/:id', planController.GetOne);
router.post('/plans' , planController.Create);
router.delete('/plans/:id', planController.Delete);
router.put('/plans/:id', planController.Update);
export const PlanRouter = router