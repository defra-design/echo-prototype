module.exports = function(router) {
  // Load helper functions
  var tools = require('../tools.js')


  // ADD extra routing here if needed.
  // require('./extra-stories.js')(router)
  const fs = require('fs');

  // CHANGE VERSION TO THE VERSION
  const version = 'beta/v2'
  const base_url = version + "/cloning"
  const file_url = version + "/core"
  var database = "ehc8327"
  const certificate= "8327EHC"
  const db = []
  var normalizedPath = require("path").join(__dirname, "../../data/certificates");
  fs.readdirSync(normalizedPath).forEach(function(file) {
    // require("./routes/" + file);
    var d = require("../../data/certificates/" + file);
    var n = file.substring(0, file.lastIndexOf("."));
    var f = {"id":n,"data":d}
    db.push(f)
  });
  // router.post('/'+base_url+'*/certificate/exa/certifier-confirm-address', function(req, res) {
  //
  //
  // })
  function getDB(id){

    for (var i = 0; i < db.length; i++) {
      if (db[i].id == id) {
        return db[i];
      }
    }
    return false;
  }

  function findPage(arr,id){

    for (var i = 0; i < arr.length; i++) {
      if (arr[i].page == id) {
        return arr[i];
      }
    }
    return false;
  }
  function countProperties (obj) {
      var count = 0;

      for (var property in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, property)) {
              count++;
          }
      }

      return count;
  }
  function getBlankFields(obj){
    var arr = []
      for (var property in obj) {
        console.log("Checking:" + property)
        if(obj[property] == "" && property!="saveAndContinue" &&  property != "skip_answers" ){
          console.log("adding:" + property)
          arr.push(property)
        }
      }
      return arr
  }
  router.get('/'+base_url+'*/certificate/new-certificate', function(req, res) {
    console.log()
    console.log("---rendering page --- ")
    console.log(req.session.data.test)

    req.session.data.test = req.session.data.test || "new"
    if(req.query.test){
      req.session.data.test = req.query.test
    }
    console.log(req.session.data.test)
    res.render(base_url +req.params[0]+ '/certificate/new-certificate', {
      "query": req.query,
      "certificate": db
    }, function(err, html) {
      if (err) {
        if (err.message.indexOf('template not found') !== -1) {
          return res.render(file_url +  '/certificate/new-certificate',{"query": req.query,"certificate": db});
        }
        throw err;
      }
      res.send(html);
    })
  });
  router.post('/'+base_url+'*/certificate/cloning', function(req, res) {
    req.session.data.file_id_count += 1
    if(req.body.is_certifier_address_correct =="yes"){
      res.redirect(301, '/' + base_url +req.params[0]+ '/certificate/check-your-progress');
    }else{
      res.redirect(301, '/' + base_url +req.params[0]+'/certificate/exa/certifier-new-address');
    }

  })

  // this adds query to all pages and will be called if no other get routing exists.
  router.get('/' + base_url + '*', function(req, res) {
    console.log("default get routing page for: "+base_url + req.params[0])

    var dir = req.params[0].split(/\/+/g);
    // Remove the main folder
    dir.shift()
    var baseDir = ""
    dir.forEach(function(element) {
      var path = "/" + element
      baseDir += path

    })
    res.render(base_url + req.params[0], {"query":req.query},function(err, html) {
      if (err) {
        if (err.message.indexOf('template not found') !== -1) {
          console.log("No page in directory.attempting to load from core")
          return res.render(file_url + baseDir,{"query":req.query});
      }
        throw err;
      }
      res.send(html);
    });
  })
}
