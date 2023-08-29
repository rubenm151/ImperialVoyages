const connection = require("../config/db");
const bcrypt = require("bcrypt");

class ProvinceController {
  getAllProvinces = (req, res) => {
    let sql = "SELECT * from province where province_is_deleted = 0";
    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.render("allProvinces", { result });
    });
  };

  showFormProvince = (req, res) => {
    res.render("formProvince");
  };

  registerFormProvince = (req, res) => {
    let img = "/images/provinces/default-china.jpg";

    const {
      province_name,
      province_description,
      province_email,
      province_tel,
      province_password,
    } = req.body;
    const salt = 10;
    if (
      province_name === "" ||
      province_description === "" ||
      province_email === "" ||
      province_tel === "" ||
      province_password === ""
    ) {
      return res.render("formProvince", {
       message: "You have to fill in each field",
      });
    }

    if (req.file != undefined) {
      img = `${req.file.filename}`;
    }

    bcrypt.hash(province_password, salt, (err, hash) => {
      if (err) throw err;

      let sql = `INSERT INTO province (province_name, province_description, province_email, province_tel, province_password, province_img) VALUES ("${province_name}", "${province_description}","${province_email}","${province_tel}", "${hash}", "${img}")`;

      connection.query(sql, (err, result) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res.render("formProvince", {
              message: "El email ya existe",
            });
          } else {
            return res.render("formProvince", {
              message: "ups!!!, hay algun problema!!!!",
            });
          }
        }
        res.redirect("/");
      });
    });
  };

  oneProvince = (req, res) => {
    const { province_id } = req.params;
    let message = "";

    if (req.query.form === "error") {
      message = "You must fill in every field";
    }

    let sql = `SELECT * FROM province WHERE province_id = ${province_id}`;
    let sqlLandmarks = `SELECT * FROM landmark WHERE province_id = ${province_id} AND landmark_is_deleted = 0`;

    connection.query(sql, (err, resultProvince) => {
      if (err) throw err;

      connection.query(sqlLandmarks, (err2, resultLandmark) => {
        if (err2) throw err2;

        res.render("oneProvince", { resultProvince, resultLandmark, message });
      });
    });
  };
}

module.exports = new ProvinceController();
