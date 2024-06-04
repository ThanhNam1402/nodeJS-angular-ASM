import db from "./../../models/index";

let getAll = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const start = parseInt(req.query.start) || 0;

      const data = await db.Specialized.findAll({
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
      const data = await db.Specialized.findOne({
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

let Creat = (req, res, dataAdd) => {
  return new Promise(async (resolve, reject) => {
    try {
      const PostData = await db.Specialized.create({
        name: dataAdd.name,
        qty_student: dataAdd.qty_student,
      });

      if (PostData) {
        res.status(201).json({
          error: 0,
          messges: "Add successfully!",
          success: true,
          data: PostData,
        });
      } else {
        res.status(404).json({
          error: 1,
          messges: "Creat Fell!",
          success: false,
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
      const DeleteData = await db.Specialized.destroy({
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

let Update = (req, res, id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let updateData = {
        name: data.name,
        qty_student: data.qty_student,
      };

      const fileone = await db.Specialized.findOne({
        where: {
          id: id,
        },
      });
      if (!fileone) {
        res.status(404).json({
          error: 1,
          messges: "The target to be updated was not found!",
          success: false,
          data: [],
        });
      } else {
        const Update = await db.Specialized.update(updateData, {
          where: {
            id: id,
          },
        });
        if (Update) {
          res.status(202).json({
            error: 0,
            messges: "Update successfully!",
            success: true,
            data: updateData,
          });
        } else if (!Update) {
          res.status(404).json({
            error: 1,
            messges: "Missing ID and Delete Fell!",
            success: false,
            data: [],
          });
        }
      }
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};




module.exports = {
  getAll: getAll,
  getOne: getOne,
  Remove: Remove,
  Creat: Creat,
  Update: Update
};
