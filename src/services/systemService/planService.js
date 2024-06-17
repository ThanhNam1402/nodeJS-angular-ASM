import db from "./../../models/index";

const apiurl = 'http://localhost:8181/api/plans'
const limit = 6
const { Op } = require('sequelize');

let getAll = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const start = (page - 1) * limit;

    const data = await db.Plan.findAndCountAll({
      limit: limit,
      offset: start,
      include: [{
        model: db.Specialized,
        attributes: ['name'] // Trường 'name' của bảng 'specialized'
      },
      {
        model: db.User,
        attributes: ['full_name'] // Trường 'full_name' của bảng 'user'
      }
      ],
      raw: true,
      nest: true
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
        data: data.rows, // Trả về trường 'name' của bảng 'specialized'
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
      messges: err.message, // Trả về thông báo lỗi cụ thể từ đối tượng lỗi
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
        include: [{
          model: db.Specialized,
          attributes: ['name'] // Trường 'name' của bảng 'specialized'
        },
        {
          model: db.User,
          attributes: ['full_name'] // Trường 'full_name' của bảng 'user'
        }],
        raw: true,
        nest: true
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

let Create = (req, res, dataAdd) => {
  return new Promise(async (resolve, reject) => {
    try {
      const PostData = await db.Plan.create({
        name: dataAdd.name,
        userId: dataAdd.userId,
        specializedId: dataAdd.specializedId,
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
        userId: data.userId,
        specializedId: data.specializedId,
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

// =================================================================

let handleGetAllFiles = async (filter) => {
  try {
    console.log("filter", filter);

    let { count, rows } = await db.PlanFile.findAndCountAll({
      where: {
        type: filter.type,
        plan_ID: filter.plan_ID
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      limit: limit,
      offset: (Number(filter.page) - 1) * limit,
      order: [['id', 'DESC']],
      raw: true,
    });


    let pagination = {
      last_page: Math.ceil(count / limit),
      page: Number(filter.page),
      apiUrl: apiurl
    }


    console.log(rows);
    let res = {
      data: rows,
      pagination: pagination
    }

    return res


  } catch (error) {
    throw error;
  }
}

let handleAddPlanFiles = async (listFile) => {
  return new Promise(async (resolve, reject) => {
    try {

      listFile.forEach(async (item, index) => {
        let typeFile = 0
        if (item.mimetype == "image/png" || item.mimetype == "image/jpg" || item.mimetype == "image/jpeg") {
          typeFile = 1
        }
        await db.PlanFile.create({
          name: item.filename,
          type: typeFile,
        })
      })

      resolve({
        success: true,
        message: 'Thêm Thành Công'
      });
    } catch (error) {
      reject(error);
    }
  })


}

let handleDelFile = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let file = await db.PlanFile.findOne({
        where: { id: id },
        raw: false
      })

      if (!file) {
        resolve({
          success: false,
          message: "Erro !! Không tìm thấy files"
        })
      } else {
        await file.destroy();
        resolve({
          success: true,
          message: "Thao Tác Thành Công !" + file.name
        })
      }
    } catch (error) {
      reject(error)
    }

  })
}

module.exports = {
  getAll: getAll,
  getOne: getOne,
  Create,
  Remove: Remove,
  Update: Update,

  handleGetAllFiles,
  handleAddPlanFiles,
  handleDelFile
};
