module.exports = function(router) {
  // Load helper functions
  var tools = require('../tools.js')


  // ADD extra routing here if needed.
  // require('./extra-stories.js')(router)


  // CHANGE VERSION TO THE VERSION
  const version = 'ehc-8327'
  const base_url = version + "/"
  const database = "ehc8327"
  const certificate= "8327EHC"


function isDupucate(arr,name){
  for (var i = 0; i < arr.length; i++) {

    if (arr[i].name == name) {
      return true;
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


router.get('/'+base_url+'certificate/check-your-*', function(req, res) {
  req.session.data.certificate = certificate
  console.log(req.session.data)
  res.render(base_url + '/certificate/check-your-'+req.params[0], {
    "query": req.query,
    "tasks": req.session.data[database].pages
  });
});
router.post('/'+base_url+'certificate/exa/certifier-confirm-address', function(req, res) {
  req.session.data.file_id_count += 1
  if(req.body.is_certifier_address_correct =="yes"){
    res.redirect(301, '/' + base_url + 'certificate/exa/certifier-certificate-delevery');
  }else{
    res.redirect(301, '/' + base_url + 'certificate/exa/certifier-new-address');
  }

})
function addProduct(arr,page,post){
  // get all fields from the page
  var f = page.content.fields
  var p = {"id":arr.length }
  for (var i = 0; i < f.length; i++) {
    // for each field create an obj with the Key being the field name
    // and the value being the posted data from that field
    console.log("adding : "+f[i].name)

    var v = post[f[i].name]
    p[f[i].name]=v

  }
  arr.push(p)
}


router.post('/'+base_url+'certificate/page', function(req, res, next) {
  var query = ""
  if(req.query.product_page){
    var product = findPage(req.session.data[database].pages,req.query.id)
    addProduct(req.session.data.products,product,req.body)
  }
  if(req.query.next == "product-list"){
    query+=("id="+req.query.id)
  }
  req.session.data.completed[req.query.id] = req.query.id
  if(req.body.cta == "Save and continue" || req.body.cta == "Save and preview"){
    res.redirect(301, '/' + base_url + 'certificate/'+req.query.next+"?"+query);
  }else{
    res.redirect(301, '/' + base_url + 'certificate/page?id='+req.query.id+"&new=yes&product_page=yes&next="+req.query.next);
  }

})


router.get('/'+base_url+'certificate/page', function(req, res) {
  var id =  parseInt(req.query.id) || 0;
  res.render(base_url+'certificate/page', {
    "query": req.query,
    "page":findPage(req.session.data[database].pages, id)
  }, function(err, html) {
    if (err) {
      if (err.message.indexOf('template not found') !== -1) {
        return res.render(file_url + '/certificate/page');
      }
      throw err;
    }
    res.send(html);
  })
})


router.get('/'+base_url+'certificate/exa/your-commodity', function(req, res) {
  res.render(base_url+'certificate/exa/your-commodity', {
    "query": req.query,
    "commodities":req.session.data[database].commodities
  }, function(err, html) {
    if (err) {
      if (err.message.indexOf('template not found') !== -1) {
        return res.render(file_url + '/exa/your-commodity');
      }
      throw err;
    }
    res.send(html);
  })
})
router.get('/'+base_url+'certificate/product-list', function(req, res) {
  var id = req.query.id || 2;

  var product = findPage(req.session.data[database].pages,id)
  res.render(base_url+'certificate/product-list', {
    "query": req.query,
    "product":product
  }, function(err, html) {
    if (err) {
      if (err.message.indexOf('template not found') !== -1) {
        return res.render(file_url + '/certificate/product-list');
      }
      throw err;
    }
    res.send(html);
  })
})

router.get('/'+base_url+'certificate/supporting-documents', function(req, res) {

  if(req.query.delete){
    tools.removeFromList(req.session.data.uploaded_files,req.query.delete)
  }
  res.render(base_url+'certificate/supporting-documents', {
    "query": req.query
  }, function(err, html) {
    if (err) {
      if (err.message.indexOf('template not found') !== -1) {
        return res.render(file_url + '/certificates/'+ req.params[0] + '/supporting-documents');
      }
      throw err;
    }
    res.send(html);
  })
})


router.post('/'+base_url+'certificate/supporting-documents', function(req, res) {
  req.session.data.file_id_count += 1

  var query = "?"
  // if content add to addtoArray
  var file = req.body.file || "test_supporting_document.docx";
  var description = req.body.file_description || ""
  var id = req.session.data.file_id_count
  if(isDupucate(req.session.data.uploaded_files,file)){
    query+="hasError=true&errorType=duplicate"
  }else{
    // add uploaded file.
    req.session.data.uploaded_files.push({"name":file,"description":description,"ID":id})
  }
  res.redirect(301, '/' + base_url + 'certificate/supporting-documents'+query);
})

  // this adds query to all pages and will be called if no other get routing exists.
  router.get('/' + base_url + '*', function(req, res) {
    console.log("default get routing page for: "+base_url + req.params[0])
    res.render(base_url + req.params[0], {
      "query":req.query
    });
  })

}
