module.exports = function(router) {
  // Load helper functions
  var tools = require('../tools.js')

  require('./cloning.js')(router)
  require('./EXP-8639-update-clone-journey.js')(router)
  require('./EXP-8648-keep-reference-number.js')(router)
  require('./EXP-8649-invalid-clone-items.js')(router)

  // ADD extra routing here if needed.
  // require('./extra-stories.js')(router)
  const fs = require('fs');

  // CHANGE VERSION each time you create a new version
  const version = 'beta/v3'
  const base_url = version + "/"
  const file_url = version + "/core"
  // var database = "ehc3987"
  // const certificate= "3987EHC"
  const db = []

  // Load any certificate within "app/data/certificates" folder
  var normalizedPath = require("path").join(__dirname, "../../data/certificates");
  fs.readdirSync(normalizedPath).forEach(function(file) {
    // require("./routes/" + file);
    var d = require("../../data/certificates/" + file);
    var n = file.substring(0, file.lastIndexOf("."));
    var f = {"id":n,"data":d}
    db.push(f)
  });


// ---  middleware: Called every time a page is rendered---
router.use(function (req, res, next) {
  // this makes sure a certificate is loaded
  if(req.query.certificate && req.session.database != req.query.certificate){
    req.session.database=req.query.certificate
    req.session.db = tools.getDB(req.query.certificate).data
  }
  // if the certificate is does not exist get one.
  req.session.db = req.session.db || tools.getDB(req.session.data.database).data
  next()
})

router.get('/'+base_url+'*/start', function(req, res) {

  var db = tools.getDB(req.session.database).data
  req.session.data.certificate = db.certificate_code
  res.render(base_url +req.params[0]+ '/start', {
    "query": req.query,
    "certificate": db
  }, function(err, html) {
    if (err) {
      if (err.message.indexOf('template not found') !== -1) {
        return res.render(file_url +  '/start',{"query": req.query,"certificate": db});
      }
      throw err;
    }
    res.send(html);
  })
});

// **** cloning ***
router.post('/'+base_url+'*/clone*', function(req, res) {
  if(req.body.application_type =="clone"){
    req.session.data=[]
    res.redirect(301, '/' + base_url +req.params[0]+ '/certificate/check-your-answers-cloned?certificate=ehc6969&alert=cloned');
  }else{
    res.redirect(301, '/' + base_url +req.params[0]+'/dashboard');
  }
})

// **** Check your answers and check your progress ****
router.get('/'+base_url+'*/certificate/check-your-*', function(req, res) {
  // Same code for both check you progress and check your answers
  // req.params[1] is the second wide card. In this case it will be the remaining URL after check-your-{whatever this is}
  res.render(base_url +req.params[0]+ '/certificate/check-your-'+req.params[1], {
    "query": req.query,
    "db": req.session.db
  }, function(err, html) {
    // Loads from the core folder if this page doesnt exist in the current folder
    if (err) {
      if (err.message.indexOf('template not found') !== -1) {
        //Get page from core
        return res.render(file_url + '/certificate/check-your-'+req.params[1],{"query": req.query,"db": req.session.db});
      }
      throw err;
    }
    //render page
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

router.get('/'+base_url+'*/certificate/page-2', function(req, res) {
  var id =  parseInt(req.query.id) || 0;
  res.render(base_url+req.params[0]+'/certificate/page-2', {
    "query": req.query,
    "page":tools.findPage(tools.getDB(req.session.database).data.pages, id)
  }, function(err, html) {
    if (err) {
      if (err.message.indexOf('template not found') !== -1) {
        console.log("Could not find "+ base_url+req.params[0]+'/certificate/page' +": Loading from main folder")
        return res.render(file_url + '/certificate/page-2',{"query": req.query,"page":tools.findPage(tools.getDB(req.session.database).data.pages, id)});
      }
      throw err;
    }
    res.send(html);
  })
})

router.post('/'+base_url+'*/certificate/page-2', function(req, res, next) {
  console.log("working!")
    req.session.data.horses = req.session.data.horses || []
    var horse = tools.findPage(tools.getDB(req.session.database).data.pages,req.query.id)
    console.log(req.body)
    if(req.query.edit){
      tools.updateProduct(req.query.horse,req.session.data.horses,horse,req.body)
    }else{
      tools.addProduct(req.session.data.horses,horse,req.body)
    }
    req.session.data.completed[req.query.id] = req.query.id

    console.log(req.session.data.horses)
    res.redirect(301, '/' + base_url +req.params[0]+ '/certificate/check-your-progress');
})

router.post('/'+base_url+'*/certificate/page', function(req, res, next) {
  var query = ""

  if(req.query.product_page){
    req.session.data.products = req.session.data.products || []
    var product = tools.findPage(tools.getDB(req.session.database).data.pages,req.query.id)
    if(req.query.edit){
      tools.updateProduct(req.query.edit,req.session.data.products,product,req.body)
    }else{
      tools.addProduct(req.session.data.products,product,req.body)
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
    "page":tools.findPage(tools.getDB(req.session.database).data.pages, id)
  }, function(err, html) {
    if (err) {
      if (err.message.indexOf('template not found') !== -1) {
        console.log("Could not find "+ base_url+req.params[0]+'/certificate/page' +": Loading from main folder")
        return res.render(file_url + '/certificate/page',{"query": req.query,"page":tools.findPage(tools.getDB(req.session.database).data.pages, id)});
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
    "commodities":tools.getDB(req.session.database).data.commodities
  }, function(err, html) {
    if (err) {
      if (err.message.indexOf('template not found') !== -1) {
        return res.render(file_url + '/certificate/exa/your-commodity',{"query": req.query,
        "commodities":tools.getDB(req.session.database).data.commodities});
      }
      throw err;
    }
    res.send(html);
  })
})
router.get('/'+base_url+'*/certificate/product-list', function(req, res) {
  var id = req.query.id || 2;
  console.log(req.session.data.products.length)
  var product = tools.findPage(tools.getDB(req.session.database).data.pages,id)
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


// Supporting document page
router.post('/'+base_url+'*certificate/supporting-documents', function(req, res) {
  req.session.data.file_id_count += 1

  var query = "?"
  // if content add to addtoArray
  var file = req.body.file || "test_supporting_document.docx";
  var description = req.body.file_description || ""
  var id = req.session.data.file_id_count
  if(tools.isDupucate(req.session.data.uploaded_files,file)){
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
    res.render(base_url + req.params[0], {
      "query":req.query,
      "db": req.session.db
    },function(err, html) {
      if (err) {
        if (err.message.indexOf('template not found') !== -1) {
          console.log("No page in directory.attempting to load from core")
          return res.render(file_url + baseDir,{"query":req.query,"db": req.session.db});
      }
        throw err;
      }
      res.send(html);
    });
  })

}
