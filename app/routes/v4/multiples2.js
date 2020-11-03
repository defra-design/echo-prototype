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

  function getNextRepeatablePage(data,current){
    console.log("--- Adding repeatable ----")
    console.log(data)
    var r = false
    for (var i = 0; i < data.length; i++) {
      if (data[i].repeatable && data[i].repeatable == "Yes"){
        return data[i].page
      }
    }
    return arr
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
  router.post('/' + base_url + "*/certificate/page", function(req, res) {

    var query = ""
    var page=tools.findPage(tools.getDB(req.session.database, db).data.pages, req.query.id)
    var page_name = page.title

    var repeat = getNextRepeatablePage(tools.getDB(req.session.database, db).data.pages,req.query.id)
    console.log("POST")
    console.log("next repeatable is: "+repeat)

    req.session.data.empty = []
    //check if anthing is empty
    req.session.data.empty = tools.getBlankFields(req.body)
    // console.log(tools.getDB(req.session.data.database,db).data.pages[req.query.id])

    // Show error message if the user has left anything blank and not skipped
    req.body.skip_answers = req.body.skip_answers || []
    if (req.session.data.empty.length > 0 && !req.body.skip_answers.includes('skip') && page.exa!="yes") {

      // ensure this page has been removed from the skipped list (used in check your progress)
      req.session.data.skipped = req.session.data.skipped.filter(e => e !== page_name)
      return res.redirect(301, '/' + base_url + req.params[0] + '/certificate/page?id='+req.query.id+'&next='+ req.query.next+'&hasError=yes');
    }
    // add this page to the skipped list
    if (!req.session.data.skipped.includes(page_name)) {
      req.session.data.skipped.push(page_name);
    }
    //reset the sesson data object for "empty"
    req.session.data.empty = []

    if (req.query.product_page) {
      req.session.data.products = req.session.data.products || []
      var product = tools.findPage(tools.getDB(req.session.database, db).data.pages, req.query.id)
      if (req.query.edit) {
        console.log("UPDATE PRODUCT")
        tools.updateProduct(req.query.edit, req.session.data.products, product, req.body)
      } else {
        tools.addProduct(req.session.data.products, product, req.body)
      }
    }
    if (req.query.next == "product-list") {
      query += ("id=" + req.query.id)
    }
    req.session.data.completed[req.query.id] = req.query.id
    if (req.body.cta == "Save and continue" || req.body.cta == "Save and review") {
      res.redirect(301, '/' + base_url + req.params[0] + '/certificate/' + req.query.next + "?" + query);
    } else {
      res.redirect(301, '/' + base_url + req.params[0] + '/certificate/page?id=' + req.query.id + "&new=yes&product_page=yes&next=" + req.query.next);
    }

  })

}
