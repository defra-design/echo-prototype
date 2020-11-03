module.exports = function(router) {
  // Load helper functions
  var tools = require('../tools.js')


  // ADD extra routing here if needed.
  // require('./extra-stories.js')(router)
  const fs = require('fs');

  // CHANGE VERSION TO THE VERSION
  const version = 'beta/v6'
  const base_url = version + "/EXP-9235-task-list-improvements"
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

  router.post('/' + base_url + '*/certificate/exa/certifier-confirm-address', function(req, res) {
    req.session.data.file_id_count += 1
    if (req.body.is_certifier_address_correct == "yes") {
      res.redirect(301, '/' + base_url + req.params[0] + '/certificate/exa/certifier-certificate-delivery');
    } else {
      res.redirect(301, '/' + base_url + req.params[0] + '/certificate/exa/certifier-new-address');
    }
  })


  router.post('/' + base_url + "*/certificate/page", function(req, res) {
    var query = ""
    var page=tools.findPage(tools.getDB(req.session.database, db).data.pages, req.query.id)
    var page_name = page.title

    req.session.data.empty = []

    //check if anthing is empty
    req.session.data.empty = tools.getBlankFields(req.body)
    // console.log(tools.getDB(req.session.data.database,db).data.pages[req.query.id])



    // Show error message if the user has left anything blank and not skipped
    req.body.skip_answers = req.body.skip_answers || []
    if (req.session.data.empty.length > 0 && !req.body.skip_answers.includes('skip') && page.exa!="yes"  && page.can_save_address !='yes') {
      // ensure this page has been removed from the skipped list (used in check your progress)
      req.session.data.skipped = req.session.data.skipped.filter(e => e !== page_name)
      return res.redirect(301, '/' + base_url + req.params[0] + '/certificate/page?id='+req.query.id+'&next='+ req.query.next+'&hasError=yes');
    }
    // add this page to the skipped list
    if (!req.session.data.skipped.includes(page_name)) {
      req.session.data.skipped.push(page_name);
    }
    var address_input_name= page.content.fields[0].name
    //save address from a radio button but removing the "differnt address field"

    if(page.can_save_address && req.body[address_input_name] != ""){
      // create a new array to hold the address of this type if one does not already exist
      req.session.data[page.address_type] = req.session.data[page.address_type] || new Array();

      if(req.body[address_input_name].includes("differnt_address")){
        req.body[page.address_input_name].shift()
      }

      // Save the new address into appropriate list
      req.session.data[page.address_type].push(req.body[page.address_input_name])
    }
    console.log("req.body[address_input_name+'_radio'] = "+req.body[address_input_name+'_radio'])




    //reset the sesson data object for "empty"
    req.session.data.empty = []

    // main journey NOT Multiple


    // when a user comes to edit a multiple we need to push the user confirm when changing content that is not repeatable.

    if(req.session.data.journey == "linear" && req.query.change != "yes"){
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
    var return_url = req.session.data.return_url+"?" || "check-your-progress?"
    next = page.content.next || "check-your-progress?"


    req.session.data.completed[req.query.id] = req.query.id
    if (req.body.cta == "Save and continue" || req.body.cta == "Save and review") {
      res.redirect(301, '/' + base_url + req.params[0] + '/certificate/' + next + "&" + query);
    } else {
      res.redirect(301, '/' + base_url + req.params[0] + '/certificate/page?id=' + req.query.id + "&new=yes&product_page=yes&next=" + req.query.next);
    }

  })

  router.get('/'+base_url+'*/certificate/product-check-answers', function(req, res) {
    var id = req.query.id || 2;
    var product = tools.findPage(tools.getDB(req.session.database,db).data.pages,id)
    console.log("---------")
    console.log(req.session.data.products)
    console.log("---------")
    res.render(base_url+req.params[0]+'/certificate/product-check-answers', {
      "query": req.query,
      "product":product
    }, function(err, html) {
      if (err) {
        if (err.message.indexOf('template not found') !== -1) {
          return res.render(file_url + '/certificate/product-check-answers');
        }
        throw err;
      }
      res.send(html);
    })
  })
  router.post('/'+base_url+'*/certificate/product-check-answers', function(req, res, next) {
    var product_title= (req.session.data.Processs_category) ? req.session.data.Processs_category +','+req.session.data.product_category : "Pork, Cuts";
    req.session.data.product_loop = req.session.data.product_loop || []
    req.session.data.product_loop.push(product_title)
    res.redirect(301, '/' + base_url +req.params[0]+ '/certificate/product-list?id='+req.query.id);
  })

}
