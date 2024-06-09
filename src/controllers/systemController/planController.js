import db from "./../../models/index";

import planService from "./../../services/systemService/planService";

let getAll = async (req, res) => {
  const data = await planService.getAll(req, res);
  return data;
};

let getOne = async (req, res) => {
  const id = req.params.id;
  const data = await planService.getOne(req, res, id);
  return data;
};
let Creat = async (req, res)=> {
  const dataAdd = req.body;
  const data = await planService.Creat(req, res, dataAdd);
  return data;
}

let Delete = async (req, res) => {
  const id = req.params.id;
  const data = await planService.Remove(req, res, id);
  return data;
};

let Update = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const update = await planService.Update(req, res, id, data);
  return update;
}

module.exports = {
  getAll: getAll,
  GetOne: getOne,
  Creat: Creat,
  Delete: Delete,
  Update: Update
};
