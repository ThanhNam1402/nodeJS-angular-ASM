import db from "./../../models/index";


const apiurl = 'http://localhost:8181/api/plans'


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

// =================================================================

let handleGetAllFiles = async (filter) => {
  try {
    console.log("filter", filter);

    let { count, rows } = await db.PlanFile.findAndCountAll({
      where: {
        type: filter.type,
      },
      limit: Number(filter.limit),
      offset: (Number(filter.page) - 1) * Number(filter.limit),
      order: [['id', 'DESC']],
      raw: true,
    });


    let pagination = {
      last_page: Math.ceil(count / filter.limit),
      page: Number(filter.page),
      apiUrl: apiurl
    }
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

module.exports = {
  getAll: getAll,
  getOne: getOne,
  Creat: Creat,
  Remove: Remove,
  Update: Update,

  handleGetAllFiles,
  handleAddPlanFiles
};
