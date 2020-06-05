module.exports = function(router) {
  // Load helper functions
  var tools = require('../tools.js')


  // ADD extra routing here if needed.
  // require('./extra-stories.js')(router)
  const fs = require('fs');

  // CHANGE VERSION TO THE VERSION
  const version = 'beta/v6'
  const base_url = version + "/form-finder"
  const file_url = version + "/core"
  const db = []
  var normalizedPath = require("path").join(__dirname, "../../data/certificates");
  fs.readdirSync(normalizedPath).forEach(function(file) {
    // require("./routes/" + file);
    var d = require("../../data/certificates/" + file);
    var n = file.substring(0, file.lastIndexOf("."));
    var f = {"id":n,"data":d}
    db.push(f)
  });
  // Load any certificate within "app/data/certificates" folder


  router.post('/' + base_url + '*/form-finder', function(req, res) {
    r
  })
  router.get('/'+base_url+'*/form-finder', function(req, res) {
    var forms = require('../../data/forms.json')
    res.render(base_url+req.params[0]+'/form-finder', {
      "query": req.query,
      "forms":forms
    }, function(err, html) {
      if (err) {
        if (err.message.indexOf('template not found') !== -1) {
          return res.render(file_url + '/form-finder', {"query": req.query,
          "forms":forms});
        }
        throw err;
      }
      res.send(html);
    })
  })


}
