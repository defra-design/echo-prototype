module.exports = function(router) {
  // Load helper functions
  var tools = require('../tools.js')


  // ADD extra routing here if needed.
  // require('./extra-stories.js')(router)
  const fs = require('fs');

  // CHANGE VERSION TO THE VERSION
  const version = 'beta/v1'
  const base_url = version + "/blocks"
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
  router.post('/'+base_url+'*/certificate/page', function(req, res, next) {
    var id =  parseInt(req.query.id) || 0;
    var page = findPage(getDB(database).data.pages, id);
    var query = ""
    req.body.skip_answers = req.body.skip_answers || ["skip"]
    //check if anthing is empty
    req.session.data.empty = getBlankFields(req.body)
    // Show error message if the user has left anything blank and not skipped
    if(req.session.data.empty.length > 0 && !req.body.skip_answers.includes('skip')){
      // ensure this page has been removed from the skipped list (used in check your progress)
      req.session.data.skipped = req.session.data.skipped.filter(e => e !== page)
      return res.redirect(301, '/' + base_url +req.params[0]+ '/certificate/page?id='+req.query.id+"&next="+req.query.next+'&hasError=yes');
    }
    // add this page to the skipped list
    if(!req.session.data.skipped.includes(page)){
    req.session.data.skipped.push(page);
    }
    if(req.query.product_page){
      var product = findPage(getDB(database).data.pages,req.query.id)
      addProduct(req.session.data.products,product,req.body)
    }
    if(req.query.next == "product-list"){
      query+=("id="+req.query.id)
    }
    req.session.data.completed[req.query.id] = req.query.id
    if(req.body.cta == "Save and continue" || req.body.cta == "Save and review"){
      res.redirect(301, '/' + base_url +req.params[0]+ '/certificate/'+req.query.next+"?"+query);
    }else{
      res.redirect(301, '/' + base_url +req.params[0]+ '/certificate/page?id='+req.query.id+"&new=yes&hasError=no&product_page=yes&next="+req.query.next);
    }

  })
}
