import db from "./../../models/index";

let getAll = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const start = (page - 1) * limit;

    const data = await db.Plan.findAndCountAll({
      limit: limit,
      offset: start,
    });

    if (data.count > 0) {
      const lastPages = Math.ceil(data.count / limit);
      const end = start + data.rows.length;


      const pagination = {
        lastPages: lastPages,
        currentPage: page
      };

      res.status(200).json({
        messges: "Get All successfully!",
        success: true,
        data: data.rows,
        start: start,
        end: end,
        limit: limit,
        pagination: pagination,
      });
    } else {
      res.status(404).json({
        error: 1,
        messges: "Get All Failed!",
        success: false,
        data: [],
        start: "",
        limit: "",
        pagination: null,
      });
    }
  } catch (err) {
    res.status(500).json({
      error: 1,
      messges: "Server Error!",
      success: false,
      data: [],
      start: "",
      limit: "",
      pagination: null,
    });
  }
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

let Creat = (req, res, dataAdd) => {
  return new Promise(async (resolve, reject) => {
    try {
      const PostData = await db.Plan.create({
        name: dataAdd.name,
        cate_ID: dataAdd.cate_ID,
        specialized_ID: dataAdd.specialized_ID,
        group: dataAdd.group,
        status: dataAdd.status,
        description: dataAdd.description,
        slug: dataAdd.slug,
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

let Update = (req, res, id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let updateData = {
        name: data.name,
        cate_ID: data.cate_ID,
        specialized_ID: data.specialized_ID,
        group: data.group,
        status: data.status,
        description: data.description,
        slug: data.slug,
      };

      const fileone = await db.Plan.findOne({
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
        const Update = await db.Plan.update(updateData, {
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
  Creat: Creat,
  Remove: Remove,
  Update: Update
};
