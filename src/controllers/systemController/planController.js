import db from "./../../models/index";
import planService from "./../../services/systemService/planService";

let getAll = async (req, res) => {
  const data = await planService.getAll(req, res);
  return data;
};

let getOne = async (req, res) => {
  const identifier = req.params.id;
  const data = await planService.getOne(req, res, identifier);
  return data;
};


let Create = async (req, res) => {
  const dataAdd = req.body;
  const data = await planService.Create(req, res, dataAdd);
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


// =============================================================================


let getAllFiles = async (req, res) => {

  try {

    let reqQuery = req.query

    console.log(reqQuery);

    let data = await planService.handleGetAllFiles(reqQuery)


    return res.status(200).json({
      ...data
    })

  } catch (error) {

  }
}

let downLoadFile = async (req, res) => {
  try {

    let { name } = req.params
    res.download('src/upload_files/' + name, name);

  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }

}

let addPlanFile = async (req, res) => {

  let reqData = {
    reqBody: req.body,
    reqFiles: req.files
  }

  try {
    let data = await planService.handleAddPlanFiles(reqData)
    res.status(200).json({ ...data })

  } catch (error) {
    res.status(404).json({ error: 'not file' })

  }
}

let delPlanFile = async (req, res) => {
  try {

    console.log(req.params);

    let { id } = req.params
    console.log(id);

    let data = await planService.handleDelFile(id)

    if (data && data.success) {
      return res.status(200).json({
        ...data
      })
    } else {
      return res.status(404).json({
        ...data
      })
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message
    })
  }
}
// 

module.exports = {
  getAll: getAll,
  GetOne: getOne,
  Create,
  Delete: Delete,
  Update: Update,

  getAllFiles,
  downLoadFile,
  addPlanFile,
  delPlanFile
};
