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

let Delete = async (req, res) => {
  const id = req.params.id;
  const data = await planService.Remove(req, res, id);
  return data;
};

module.exports = {
  getAll: getAll,
  GetOne: getOne,
  Delete: Delete,
};
