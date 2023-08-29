const connection = require("../config/db");

class LandmarkController {
  formRegisterLandmark = (req, res) => {
    let sql = "SELECT * FROM province WHERE province_is_deleted = 0";
    connection.query(sql, (err, resultAllProvinces) => {
      if (err) throw err;
      res.render("formLandmark", { resultAllProvinces });
    });
  };

  registerLandmark = (req, res) => {
    const { province_id, landmark_name, landmark_street } = req.body;

    let img;
    if (req.file) {
      img = req.file.filename;
    }

    let sql = `INSERT INTO landmark (landmark_name, landmark_street, province_id, landmark_img) VALUES ("${landmark_name}", "${landmark_street}", ${province_id}, "${img}")`;

    if (
      province_id == "0" ||
      landmark_name === "" ||
      landmark_street === "" ||
      req.file === undefined
    ) {
      return res.redirect(`/province/oneProvince/${province_id}?form=error`);
    }

    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.redirect(`/province/oneProvince/${province_id}`);
    });
  };

  delLandmark = (req, res) => {
    let landmark_id = req.params.landmark_id;

    let sql = `DELETE FROM landmark WHERE landmark_id = ${landmark_id}`;

    connection.query(sql, (err, result) => {
      if (err) throw err;

      res.redirect(`/province`);
    });
  };

  formEditLandmark = (req, res) => {
    let { landmark_id } = req.params;

    let sql = `SELECT * FROM landmark where landmark_id = ${landmark_id}`;

    connection.query(sql, (e, result) => {
      console.log(result);
      if (e) throw e;
      res.render("formEditLandmark", { result });
    });
  };

  editLandmark = (req, res) => {
    let {landmark_id} = req.params;
    let { landmark_name, landmark_street } = req.body;
    
  
    let sql = `UPDATE landmark SET landmark_name = "${landmark_name}", landmark_street = "${landmark_street}" WHERE landmark_id = ${landmark_id}`

 
  console.log(req.body);
    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.redirect("/province");
    });
  };
}

module.exports = new LandmarkController();
