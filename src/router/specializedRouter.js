import express from "express";


import SpecializedController from "../controllers/systemController/specialized";

let router = express.Router();

router.get('/specialized', SpecializedController.getAll);
router.get('/specialized/:id', SpecializedController.GetOne);
router.post('/specialized/add', SpecializedController.Creat);
router.delete('/specialized/delete/:id', SpecializedController.Delete);
router.put('/specialized/update/:id', SpecializedController.Update);

export const specialized = router