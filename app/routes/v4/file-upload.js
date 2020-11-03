module.exports = function(router) {
  // Load helper functions
  var tools = require('../tools.js')
  const fileUpload = require('express-fileupload');

  // ADD extra routing here if needed.
  // require('./extra-stories.js')(router)
  const fs = require('fs');

  // CHANGE VERSION TO THE VERSION
  const version = 'beta/v4'
  const base_url = version + "/file-upload"
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
        }
      }

    }
    obj = {'title':name,'content': newcert}
    list.push(obj)
  }

  function getNextRepeatablePage(data,current){
    console.log("--- Finding REPEATABLE----")

    for (var i = 0; i < data.length; i++) {
      if (data[i].repeatable && data[i].repeatable == "yes" && data[i].page > current){
        return data[i].page
      }
    }
    return false
  }

  function getNextPage(data,current){
    console.log("--- Adding next ehc page ----")
    for (var i = 0; i < data.length; i++) {
      if ( !data[i].exa || data[i].exa != "yes" ){
        if (data[i].page > current && data[i].page != "supporting-documents"){
          return data[i].page
        }
      }
    }
    return false
  }
  // default options
router.use(fileUpload());
router.post('/' + base_url + "*/certificate/upload", function(req, res) {
  // Uploaded files:
  console.log(req.files.my_profile_pic.name);
  console.log(req.files.my_pet.name);
  console.log(req.files.my_cover_photo.name);
});

}
