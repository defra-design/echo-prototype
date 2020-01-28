module.exports = function(router) {
  // Load helper functions
  var tools = require('../tools.js')


  // ADD extra routing here if needed.
  // require('./extra-stories.js')(router)
  const fs = require('fs');

  // CHANGE VERSION TO THE VERSION
  const version = 'beta/v4'
  const base_url = version + "/multiples"
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
  function addCertificate(cert,data){
    var list= data.added_certificates
    var cert=[]
    for (var i = 0; i < cert.length; i++) {
      if(cert[i].title != "Supporting documents" && !cert[i].exa ){
        for (var j = 0; j < cert[i].content.fields.length; j++) {
          var field = cert[i].content.fields[j].name
          var answer = {field:data[field]}
          cert.push(answer)
        }
      }

    }
    list.push(cert)
  }

  router.post('/'+base_url+'*/certificate/add-new-certificate', function(req, res) {
    res.redirect(301, '/' + base_url +req.params[0]+ '/certificate/new_ehc?new=yes');
  })
  router.post('/'+base_url+'*/certificate/check-your-answers-ehc', function(req, res) {
    // console.log("POST:")
    // console.log(req.session.data.database)
    // console.log("end POST")
    addCertificate(tools.getDB(req.session.data.database,db).data.pages,req.session.data)
    req.session.data.has_added_ehc="yes"
    res.redirect(301, '/' + base_url +req.params[0]+ '/certificate/certificate-list');

  })

}
