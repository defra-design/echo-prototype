module.exports = function(router) {
  // Load helper functions
  var tools = require('../tools.js')

  require('./blocks.js')(router)
  // ADD extra routing here if needed.
  // require('./extra-stories.js')(router)
  const fs = require('fs');

  // CHANGE VERSION TO THE VERSION
  const version = 'beta/v1'
  const base_url = version + "/"
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
function getDB(id){

  for (var i = 0; i < db.length; i++) {
    if (db[i].id == id) {
      return db[i];
    }
  }
  return false;
}
router.get('/'+base_url+'*/start', function(req, res) {
  if(req.query.certificate){
    database=req.query.certificate
  }
  req.session.data.certificate = getDB(database).data.certificate_code
  res.render(base_url +req.params[0]+ '/start', {
    "query": req.query,
    "certificate": getDB(database).data
  }, function(err, html) {
    if (err) {
      if (err.message.indexOf('template not found') !== -1) {
        return res.render(file_url + '/certificate/check-your-'+req.params[1],{"query": req.query,"certificate": getDB(database).data});
      }
      throw err;
    }
    res.send(html);
  })
});

router.get('/'+base_url+'*/certificate/check-your-*', function(req, res) {
  var db= getDB(database).data
  if(req.query.certificate){
    database=req.query.certificate
  }
  req.session.data.printable = db.printable || "yes"
  req.session.data.certificate = db.certificate_code
  res.render(base_url +req.params[0]+ '/certificate/check-your-'+req.params[1], {
    "query": req.query,
    "tasks": db.pages,
    "certificate_code": db.certificate_code
  }, function(err, html) {
    if (err) {
      if (err.message.indexOf('template not found') !== -1) {
        return res.render(file_url + '/certificate/check-your-'+req.params[1],{"query": req.query,"tasks": db.pages});
      }
      throw err;
    }
    res.send(html);
  })
});
router.post('/'+base_url+'*/certificate/exa/certifier-confirm-address', function(req, res) {
  req.session.data.file_id_count += 1
  if(req.body.is_certifier_address_correct =="yes"){
    res.redirect(301, '/' + base_url +req.params[0]+ '/certificate/check-your-progress');
  }else{
    res.redirect(301, '/' + base_url +req.params[0]+'/certificate/exa/certifier-new-address');
  }

})

router.get('/'+base_url+'*/select-certificate', function(req, res) {
  console.log("finding page in: "+req.params[0])
  res.render(base_url+req.params[0]+'/select-certificate', {
    "query": req.query,
    "db":db
  }, function(err, html) {
    if (err) {
      if (err.message.indexOf('template not found') !== -1) {
        return res.render(file_url + '/select-certificate',{"query": req.query,"db":db});
      }
      throw err;
    }
    res.send(html);
  })
})
function addProduct(arr,page,post){
  // get all fields from the page
  var f = page.content.fields
  var p = {"id":arr.length }

  for (var i = 0; i < f.length; i++) {
    // for each field create an obj with the Key being the field name
    // and the value being the posted data from that field
    var v = post[f[i].name]
    console.log("addding:"+v)
    p[f[i].name]=v
  }
  arr.push(p)
}
function updateProduct(id,arr,page,post){
  var f = page.content.fields
  var p = {"id":arr.length }
  for (var i = 0; i < f.length; i++) {
    // for each field create an obj with the Key being the field name
    // and the value being the posted data from that field

    var v = post[f[i].name]
    p[f[i].name]=v
  }
  arr[id]=p
}
router.post('/'+base_url+'*/certificate/page', function(req, res, next) {
  var query = ""
  if(req.query.product_page){
    req.session.data.products = req.session.data.products || []
    var product = findPage(getDB(database).data.pages,req.query.id)
    if(req.query.edit){
      updateProduct(req.query.edit,req.session.data.products,product,req.body)
    }else{
      addProduct(req.session.data.products,product,req.body)
    }
  }
  if(req.query.next == "product-list"){
    query+=("id="+req.query.id)
  }
  req.session.data.completed[req.query.id] = req.query.id
  if(req.body.cta == "Save and continue" || req.body.cta == "Save and review"){
    res.redirect(301, '/' + base_url +req.params[0]+ '/certificate/'+req.query.next+"?"+query);
  }else{
    res.redirect(301, '/' + base_url +req.params[0]+ '/certificate/page?id='+req.query.id+"&new=yes&product_page=yes&next="+req.query.next);
  }

})


router.get('/'+base_url+'*/certificate/page', function(req, res) {
  var id =  parseInt(req.query.id) || 0;
  res.render(base_url+req.params[0]+'/certificate/page', {
    "query": req.query,
    "page":findPage(getDB(database).data.pages, id)
  }, function(err, html) {
    if (err) {
      if (err.message.indexOf('template not found') !== -1) {
        console.log("Could not find "+ base_url+req.params[0]+'/certificate/page' +": Loading from main folder")
        return res.render(file_url + '/certificate/page',{"query": req.query,"page":findPage(getDB(database).data.pages, id)});
      }
      throw err;
    }
    res.send(html);
  })
})

// your-commmodities
router.get('/'+base_url+'*/certificate/exa/your-commodity', function(req, res) {
  res.render(base_url+req.params[0]+'/certificate/exa/your-commodity', {
    "query": req.query,
    "commodities":getDB(database).data.commodities
  }, function(err, html) {
    if (err) {
      if (err.message.indexOf('template not found') !== -1) {
        return res.render(file_url + '/certificate/exa/your-commodity');
      }
      throw err;
    }
    res.send(html);
  })
})
router.get('/'+base_url+'*/certificate/product-list', function(req, res) {
  var id = req.query.id || 2;
  console.log(req.session.data.products.length)
  var product = findPage(getDB(database).data.pages,id)
  if(req.query.delete){
    console.log("removing : "+req.query.delete)
    console.log(req.session.data.products.splice(req.query.delete,1))
    console.log(req.session.data.products.length)
  }
  res.render(base_url+req.params[0]+'/certificate/product-list', {
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

router.get('/'+base_url+'*/certificate/supporting-documents', function(req, res) {

  if(req.query.delete){
    tools.removeFromList(req.session.data.uploaded_files,req.query.delete)
  }
  res.render(base_url+req.params[0]+'/certificate/supporting-documents', {
    "query": req.query
  }, function(err, html) {
    if (err) {
      if (err.message.indexOf('template not found') !== -1) {
        return res.render(file_url + '/certificates/supporting-documents');
      }
      throw err;
    }
    res.send(html);
  })
})


router.post('/'+base_url+'*certificate/supporting-documents', function(req, res) {
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
  res.redirect(301, '/' + base_url + req.params[0]+'certificate/supporting-documents'+query);
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
