var express = require('express');
var router = express.Router();
const indexController = require("../controllers/indexController")

 
router.get('/', indexController.viewHome);
router.get("/contact", indexController.viewContact);

 
module.exports = router;
