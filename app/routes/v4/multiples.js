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
    console.log(cert)
    console.log("addCertificate")
    var list= data.added_certificates
    var newcert=[]
    var obj = {}
    var name = "Santa's little helper"
    for (var i = 0; i < cert.length; i++) {
      if(cert[i].title != "Supporting documents" && !cert[i].exa ){
        for (var j = 0; j < cert[i].content.fields.length; j++) {


          var field = cert[i].content.fields[j].name
          if (field == "animal_name" && data[field]){
            var name = data[field]
          }
          newcert[field] = data[field]
          console.log("adding: "+field+" and " +data[field])
        }
      }

    }
    obj = {'title':name,'content': newcert}
    list.push(obj)
    console.log(list)
  }

  router.post('/'+base_url+'*/certificate/add-new-certificate', function(req, res) {
    var cert = tools.getDB(req.session.database,db).data.pages
    // find out which page is repeatable
    req.session.data.repeatable = 0
    for (var i = 0; i < cert.length; i++) {
      console.log("Repeatable: "+cert[i].repeatable)
      if (cert[i].repeatable == "yes") {
        console.log("Found page: "+cert[i].page)
        req.session.data.repeatable = cert[i].page
      }
    }

    if(req.body.clone_as_new == "yes"){
      res.redirect(301, '/' + base_url +req.params[0]+ '/certificate/page?new=yes&id='+req.session.data.repeatable+"&next=check-your-answers-ehc");

    }else{
      res.redirect(301, '/' + base_url +req.params[0]+ '/certificate/new_ehc?new=yes');

    }

  })

  router.post('/'+base_url+'*/certificate/repeatable-page', function(req, res) {
    res.redirect(301, '/' + base_url +req.params[0]+ '/certificate/check-your-answers-ehc')
  })
  router.post('/'+base_url+'*/certificate/check-your-answers-ehc', function(req, res) {
    // console.log("POST:")
    // console.log(req.session.data.database)
    // console.log("end POST")
    console.log(req.session.database)
    addCertificate(tools.getDB(req.session.database,db).data.pages,req.session.data)
    req.session.data.has_added_ehc="yes"
    res.redirect(301, '/' + base_url +req.params[0]+ '/certificate/certificate-list');

  })

  router.get('/' + base_url + '*/certificate/certificate-list', function(req, res) {
    console.log(req.session.data.added_certificates["animal_name"])
    res.render(base_url + req.params[0] + '/certificate/certificate-list', {
      "query": req.query
    }, function(err, html) {
      if (err) {
        if (err.message.indexOf('template not found') !== -1) {
          return res.render(file_url + '/certificate/certificate-list', {
            "query": req.query
          });
        }
        throw err;
      }
      res.send(html);
    })
  });

  router.post('/'+base_url+'*/certificate/certificate-list', function(req, res) {

    if(req.body.add_new == "yes"){
      res.redirect(301, '/' + base_url +req.params[0]+ '/certificate/add-new-certificate'+req.session.data.repeatable+"&next=check-your-answers-ehc");

    }else{
      res.redirect(301, '/' + base_url +req.params[0]+ '/certificate/check-your-progress');

    }

  })

}
