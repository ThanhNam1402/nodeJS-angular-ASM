import db from "./../../models/index";

let getAll = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const start = parseInt(req.query.start) || 0;

      const data = await db.Plan.findAll({
        limit: limit,
        offset: start,
      });
      if (data) {
        const end = start + data.length;
        res.status(200).json({
          messges: "Get All successfully!",
          success: true,
          data: data,
          start: start,
          end: end,
          limit: limit,
        });
      } else {
        res.status(404).json({
          error: 1,
          messges: "Get All Fell!",
          success: false,
          data: [],
          start: "",
          limit: "",
        });
      }
      resolve("");
    } catch (err) {
      reject(err);
    }
  });
};

let getOne = (req, res, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.Plan.findOne({
        where: {
          id: id,
        },
      });
      if (data) {
        res.status(200).json({
          messges: "Get One successfully!",
          success: true,
          data: data,
        });
      } else if (data === null) {
        res.status(404).json({
          error: 1,
          success: false,
          messges: "Not found ID!",
          data: [],
        });
      } else {
        res.status(500).json({
          error: 1,
          success: false,
          messges: "Sever error!",
          data: [],
        });
      }
      resolve("");
    } catch (err) {
      reject(err);
    }
  });
};

let Remove = (req, res, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const DeleteData = await db.Plan.destroy({
        where: {
          id: id,
        },
      });
      console.log(DeleteData);

      if (DeleteData) {
        res.status(200).json({
          error: 0,
          messges: "Delete successfully!",
        });
      } else if (DeleteData == 0) {
        res.status(404).json({
          error: 1,
          messges: "Missing ID and Delete Fell!",
          data: [],
        });
      } else {
        res.status(500).json({
          error: 1,
          messges: "Sever Error!",
          data: [],
        });
      }
      resolve("");
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  getAll: getAll,
  getOne: getOne,
  Remove: Remove,
};
