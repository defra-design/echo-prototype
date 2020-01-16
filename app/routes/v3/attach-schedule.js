module.exports = function(router) {
  // Load helper functions
  var tools = require('../tools.js')


  // ADD extra routing here if needed.
  // require('./extra-stories.js')(router)
  const fs = require('fs');

  // CHANGE VERSION TO THE VERSION
  const version = 'beta/v3'
  const base_url = version + "/attach-schedule"
  const file_url = version + "/core"

  // Load any certificate within "app/data/certificates" folder
  const db = []
  var normalizedPath = require("path").join(__dirname, "../../data/certificates");
  fs.readdirSync(normalizedPath).forEach(function(file) {
    // require("./routes/" + file);
    var d = require("../../data/certificates/" + file);
    var n = file.substring(0, file.lastIndexOf("."));
    var f = {"id":n,"data":d}
    db.push(f)
  });
  router.post('/'+base_url+'*/certificate/product-list', function(req, res, next) {

    if(req.body.how_to_add_products == "manually"){
      res.redirect(301, '/' + base_url +req.params[0]+ '/certificate/page?id='+req.query.id+"&new=yes&product_page=yes&next="+req.query.next);
    }else{
      res.redirect(301, '/' + base_url +req.params[0]+ '/certificate/supporting-documents');
    }

  })

}
