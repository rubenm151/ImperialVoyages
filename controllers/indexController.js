
class IndexController {
  viewHome = (req, res) => {
    res.render("index");
  };
  viewContact = (req,res) =>{
    res.render("contact");
  }
}

module.exports = new IndexController();
