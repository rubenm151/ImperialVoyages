var express = require('express');
var router = express.Router();
const multer = require('../middlewares/multer')
const landmarkController = require('../controllers/landmarkController')


router.get("/formRegisterLandmark", landmarkController.formRegisterLandmark)

router.post("/formRegisterLandmark/:province_id", multer("landmarks"), landmarkController.registerLandmark)

router.get("/delLandmark/:landmark_id", landmarkController.delLandmark)

router.get("/formEditLandmark/:landmark_id",landmarkController.formEditLandmark)

router.post("/editLandmark/:landmark_id",landmarkController.editLandmark)


module.exports = router;