module.exports = function(router) {
  // Load helper functions
  var tools = require('../tools.js')


  // ADD extra routing here if needed.
  // require('./extra-stories.js')(router)
  const fs = require('fs');

  // CHANGE VERSION TO THE VERSION
  const version = 'beta/v2'
  const base_url = version + "/EXP-8639-update-clone-journey"
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


  router.post('/'+base_url+'*/clone*', function(req, res) {

    if(req.body.application_type =="clone"){
      req.session.data=[]
      res.redirect(301, '/' + base_url +req.params[0]+ '/certificate/check-your-answers-cloned?certificate=ehc6969&alert=cloned');
    }else{
      res.redirect(301, '/' + base_url +req.params[0]+'/dashboard');
    }

  })
  router.post('/'+base_url+'*/certificate/new-certificate', function(req, res) {

    if(req.body.application_type =="clone"){
      res.redirect(301, '/' + base_url +req.params[0]+ '/certificate/choose-certificate');
    }else{
      res.redirect(301, '/' + base_url +req.params[0]+'/certificate/form-finder');
    }

  })
  router.get('/'+base_url+'*/certificate/choose-certificate', function(req, res) {
    res.render(base_url+req.params[0]+'/certificate/choose-certificate', {
      "query": req.query,
      "db":db
    }, function(err, html) {
      if (err) {
        if (err.message.indexOf('template not found') !== -1) {
          return res.render(file_url + '/certificate/choose-certificate',{"query": req.query,"db":db});
        }
        throw err;
      }
      res.send(html);
    })
  })

}
