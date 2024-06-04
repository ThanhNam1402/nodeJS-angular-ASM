import db from "./../../models/index";

import SpecializedService from "./../../services/systemService/specializedService";

let getAll = async (req, res) => {
  const data = await SpecializedService.getAll(req, res);
  return data;
};

let getOne = async (req, res) => {
  const id = req.params.id;
  const data = await SpecializedService.getOne(req, res, id);
  return data;
};

let Creat = async (req, res)=> {
  const dataAdd = req.body;
  const data = await SpecializedService.Creat(req, res, dataAdd);
  return data;
}

let Delete = async (req, res) => {
  const id = req.params.id;
  const data = await SpecializedService.Remove(req, res, id);
  return data;
};

let Update = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const update = await SpecializedService.Update(req, res, id, data);
  return update;
}

module.exports = {
  getAll: getAll,
  GetOne: getOne,
  Delete: Delete,
  Creat: Creat,
  Update: Update
};
