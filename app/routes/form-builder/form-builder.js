module.exports = function(router) {
  // Load helper functions
  var tools = require('../tools.js')
  // require('./repeatable-questions-v3.js')(router)
  // require('./EXP-8639-update-clone-journey.js')(router)
  // require('./EXP-8648-keep-reference-number.js')(router)
  // require('./EXP-8649-invalid-clone-items.js')(router)

  // ADD extra routing here if needed.
  // require('./extra-stories.js')(router)
  const fs = require('fs');

  // CHANGE VERSION each time you create a new version
  const version = 'v1-1'
  const base_url =  "form-builder/"
  const file_url = "form-builder/"+version
  // var database = "ehc3987"
  // const certificate= "3987EHC"

  // Load any certificate within "app/data/certificates" folder
  const db = []
  var normalizedPath = require("path").join(__dirname, "../../data/certificates");
  fs.readdirSync(normalizedPath).forEach(function(file) {
    // require("./routes/" + file);
    var d = require("../../data/certificates/" + file);
    var n = file.substring(0, file.lastIndexOf("."));
    var f = {
      "id": n,
      "data": d
    }
    db.push(f)
  });


  // MIDDLEWARE: Called every time a page is rendered
  router.use(function(req, res, next) {
    // this makes sure a certificate is loaded
    if (req.query.certificate && req.session.database != req.query.certificate) {
      req.session.database = req.query.certificate
      req.session.db = tools.getDB(req.query.certificate, db).data
    }
    // if the certificate is does not exist get one.
    req.session.db = req.session.db || tools.getDB(req.session.data.database, db).data
    req.session.data.is_multiple = req.session.db.is_multiple
    req.session.data.certificate_code = req.session.db.certificate_code
    next()
  })


  // this adds query to all pages and will be called if no other get routing exists.
  router.get('/' + base_url + '*', function(req, res) {
    console.log("default get routing page for: " + base_url + req.params[0])
    var dir = req.params[0].split(/\/+/g);
    // Remove the main folder
    dir.shift()
    var baseDir = ""
    dir.forEach(function(element) {
      var path = "/" + element
      baseDir += path

    })
    res.render(base_url + req.params[0], {
      "query": req.query,
      "db": req.session.db
    }, function(err, html) {
      if (err) {
        if (err.message.indexOf('template not found') !== -1) {
          console.log("No page in directory.attempting to load from core")
          return res.render(file_url + baseDir, {
            "query": req.query,
            "db": req.session.db
          });
        }
        throw err;
      }
      res.send(html);
    });
  })

}
