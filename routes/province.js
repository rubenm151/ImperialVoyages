var express = require('express');
var router = express.Router();
const multer = require('../middlewares/multer')
const provinceController = require('../controllers/provinceController')

//IMPORTANTE ES PROVINCE EN SINGULAR

router.get("/", provinceController.getAllProvinces)

router.get("/formRegisterProvince", provinceController.showFormProvince)

router.post("/formRegisterProvince", multer("provinces"), provinceController.registerFormProvince)

router.get("/oneProvince/:province_id", provinceController.oneProvince)


module.exports = router;