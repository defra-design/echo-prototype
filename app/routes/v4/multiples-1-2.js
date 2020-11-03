module.exports = function(router) {
  // Load helper functions
  var tools = require('../tools.js')


  // ADD extra routing here if needed.
  // require('./extra-stories.js')(router)
  const fs = require('fs');

  // CHANGE VERSION TO THE VERSION
  const version = 'beta/v4'
  const base_url = version + "/multiples-1-2"
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

  router.post('/'+base_url+'*/certificate/add-new-certificate', function(req, res) {
    var cert = tools.getDB(req.session.database,db).data.pages
    // find out which page is repeatable
    req.session.data.repeatable = 0
    for (var i = 0; i < cert.length; i++) {

      if (cert[i].repeatable == "yes") {
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
    // var url = 'certificate-list'
    console.log("check-your-answers-ehc SECOND")
    var url = 'ehc-reference'
    if(req.session.data.return_check_answers){
      url =req.session.data.return_check_answers
    }
    if(req.session.data.change_ehc!="yes"){
      addCertificate(tools.getDB(req.session.database,db).data.pages,req.session.data)
      req.session.data.has_added_ehc="yes"
    }
    //
    // var url = 'certificate-list'
    if(req.session.data.return_check_answers){
      url =req.session.data.return_check_answers
    }
    res.redirect(301, '/' + base_url +req.params[0]+ '/certificate/'+url+'?change_ehc=');
  })

  router.get('/' + base_url + '*/certificate/certificate-list', function(req, res) {
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
  router.post('/' + base_url + '*/certificate/new_ehc', function(req, res) {
    var page = req.query.id || 1
    var url = 'page?id='+page+'&next=2&journey=linear'
    // if (req.query.change == "yes "){
    //   url = req.query.return_check_answers || 'check-your-answers'
    // }

    res.redirect(301, '/' + base_url +req.params[0]+ '/certificate/'+url);
  });

  router.post('/' + base_url + '*/certificate/ehc-reference', function(req, res) {
    console.log("redirectging and setting first_time to "+req.session.data.first_time)
    console.log("and query = "+req.query.first_time)
    // var page = req.query.id || 1
    // var url = 'page?id='+page+'&next=2&journey=linear'
    // if (req.query.change == "yes "){
    //   url = req.query.return_check_answers || 'check-your-answers'
    // }

    res.redirect(301, '/' + base_url +req.params[0]+ '/certificate/certificate-list');
  });

  router.post('/' + base_url + '*/certificate/delete-certificate', function(req, res) {
    console.log("delete-certificate : "+req.body.confirm_delete_certificate )
    var show_alert="no"
    if(req.body.confirm_delete_certificate == "yes"){
      console.log(req.session.data.added_certificates)
      req.session.data.added_certificates.splice(req.query.id,1)
      console.log("-----after----")
      console.log(req.session.data.added_certificates)
      show_alert="yes"
    }

    res.redirect(301, '/' + base_url +req.params[0]+ '/certificate/certificate-list?show_alert='+show_alert+'&lalert_type=deleted');
  });



  router.post('/' + base_url + '*/certificate/certificate-list'  , function(req, res) {
    //console.log('req.body.add_another_certificate '+req.body.add_another_certificate)
    if(req.body.add_another_certificate == "yes"){
      var page_id =  getNextRepeatablePage(tools.getDB(req.session.database, db).data.pages, 0)
      res.redirect(301, '/' + base_url +req.params[0]+ '/certificate/page?id='+page_id+'&first_time=no&new=yes&return_check_answers=ehc-reference');

    }else{
      var url = req.session.data.return || 'check-your-progress'
      res.redirect(301, '/' + base_url +req.params[0]+ '/certificate/'+url );

    }

  })
  router.post('/' + base_url + "*/certificate/page", function(req, res) {
    var query = ""
    var page=tools.findPage(tools.getDB(req.session.database, db).data.pages, req.query.id)
    var page_name = page.title
    console.log("--------")
    console.log(req.session.data)
    console.log("--------")
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

    // when a user comes to edit a multiple we need to push the user confirm when changing content that is not repeatable.

    if(req.session.data.journey == "linear" && req.query.change != "yes"){
      console.log("first_time = "+req.session.data.first_time )
      var nextPage = (req.session.data.first_time == "yes") ? getNextPage(tools.getDB(req.session.database, db).data.pages, req.query.id) : getNextRepeatablePage(tools.getDB(req.session.database, db).data.pages, req.query.id)
      if(nextPage){
        return res.redirect(301, '/' + base_url + req.params[0] + '/certificate/page?id='+nextPage+'&next='+ req.query.next+'&new='+req.query.new)
      }else{
      return  res.redirect(301, '/' + base_url + req.params[0] + '/certificate/check-your-answers-ehc')

      }
    }
    var nextPage =getNextRepeatablePage(tools.getDB(req.session.database, db).data.pages, req.query.id)


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
