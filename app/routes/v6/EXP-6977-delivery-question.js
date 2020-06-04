module.exports = function(router) {
  // Load helper functions
  var tools = require('../tools.js')


  // ADD extra routing here if needed.
  // require('./extra-stories.js')(router)
  const fs = require('fs');

  // CHANGE VERSION TO THE VERSION
  const version = 'beta/v6'
  const base_url = version + "/EXP-6977-delivery-question"
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


  router.post('/' + base_url + '*/certificate/exa/certifier-confirm-address', function(req, res) {
    req.session.data.file_id_count += 1
    var printable = req.session.db.printable

    if (req.session.data.certifier_has_cg_paper == "yes" || (req.session.data.certifier_is_digital == "yes" && printable == "yes") ) {
      res.redirect(301, '/' + base_url + req.params[0] + '/certificate/check-your-progress');
    }
    if (req.body.is_certifier_address_correct == "yes") {
        res.redirect(301, '/' + base_url + req.params[0] + '/certificate/exa/certifer-certificate-delivery?printable='+printable);

    } else {
      res.redirect(301, '/' + base_url + req.params[0] + '/certificate/exa/certifier-new-address');
    }
  })
  router.post('/' + base_url + '*/certificate/exa/certifier-new-address', function(req, res) {
    req.session.data.file_id_count += 1
    var printable = req.session.db.printable

    if (req.session.data.certifier_has_cg_paper == "yes" || (req.session.data.certifier_is_digital == "yes" && printable == "yes") ) {
      res.redirect(301, '/' + base_url + req.params[0] + '/certificate/check-your-progress');
    }else{
        res.redirect(301, '/' + base_url + req.params[0] + '/certificate/exa/certifer-certificate-delivery?printable='+printable);
    }

  })


}
