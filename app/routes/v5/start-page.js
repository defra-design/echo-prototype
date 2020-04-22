module.exports = function(router) {
  // Load helper functions
  var tools = require('../tools.js')


  // ADD extra routing here if needed.
  // require('./extra-stories.js')(router)
  const fs = require('fs');

  // CHANGE VERSION TO THE VERSION
  const version = 'beta/v5'
  const base_url = version + "/start-page"
  const file_url = version + "/core"

  const db = []
  var normalizedPath = require("path").join(__dirname, "../../data/certificates");
  fs.readdirSync(normalizedPath).forEach(function(file) {
    //loads directory
    var d = require("../../data/certificates/" + file);
    //Finds files
    var n = file.substring(0, file.lastIndexOf("."));
    //adds files to a an object
    var f = {
      "id": n,
      "data": d
    }
    // pushes it to an array
    db.push(f)
  });
  router.get('/'+base_url+'*/certificate/certificate-start-page', function(req, res) {

      res.render(base_url + req.params[0] + '/certificate/certificate-start-page', {
        "certificate_title": tools.getDB(req.session.database, db).data.certificate_name
      })

  })
}
