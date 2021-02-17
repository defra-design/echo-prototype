module.exports = function(router) {

  // Load helper functions
  var tools = require('../tools.js')
  var nunjucks = require('nunjucks');
  var env = new nunjucks.Environment();

/* variables for session routes*/
  var certificatefallback;
  var searchresults;
  var activerules;
  var activenotifications;
  var uniquecode;
  var uniquecodeparsed;
  var uniquecodecorrect;
  var certificatenumbercorrect;
  var uniquecodeerror;
  var certificatenumber;
  var certificatenumbererror;
  var certificatenumberparsed;
  var showlanguages;


  env.addFilter('shorten', function(str, count) {
    return str.slice(0, count || 5);
  });

  // ADD extra routing here if needed.
  require('./form-finder.js')(router)

  const fs = require('fs');
  const cheerio = require('cheerio')
  const $ = cheerio.load('https://www.gov.uk/export-health-certificates/export-dairy-and-dairy-products-to-australia-certificate-6969')
  const rp = require('request-promise');
  // CHANGE VERSION each time you create a new version
  const version = 'beta/v8'
  const base_url = version + "/"
  const file_url = version + "/core"


  // Load any certificate within "app/data/certificates" folder
  const db = []
  var normalizedPath = require("path").join(__dirname, "../../data/certificates");
  fs.readdirSync(normalizedPath).forEach(function(file) {
    //loads directory
    var d = require("../../data/certificates/" + file);
    //Finds files
    var n = file.substring(0, file.lastIndexOf("."));
    //adds files to a an object
    var f = {
      "id": n,
      "data": d
    }
    // pushes it to an array
    db.push(f)
  });

  // MIDDLEWARE: Called every time a page is rendered
  router.use(function(req, res, next) {

    // this makes sure a certificate is loaded
    if (req.query.certificate && req.session.database != req.query.certificate) {
      req.session.database = req.query.certificate
      req.session.db = tools.getDB(req.query.certificate, db).data
    }
    // if the certificate is does not exist get one.
    req.session.db = req.session.db || tools.getDB(req.session.data.database, db).data
    req.session.data.is_multiple = req.session.db.is_multiple
    req.session.data.certificate_code = req.session.db.certificate_code
    req.session.data.currentURL = req.path
    next()
  })

  //Conditional routing of certificates
  router.get('/disease-clearance-1/set-variables', function (req, res) {
  console.log("The GET is running1");
    req.session.data['disease-clearance-equine']="Certifier";
    req.session.data['disease-clearance-shellfish-group']="Certifier";
    req.session.data['disease-clearance-clams']="Certifier";
    req.session.data['disease-clearance-crabs']="Certifier";
    req.session.data['disease-clearance-crayfish']="Certifier";
    req.session.data['disease-clearance-lobster']="Certifier";
    req.session.data['disease-clearance-mixedshellfish']="Certifier";
    req.session.data['disease-clearance-molluscs']="Certifier";
    req.session.data['disease-clearance-mussels']="Certifier";
    req.session.data['disease-clearance-oysters']="Certifier";
    req.session.data['disease-clearance-prawns']="Certifier";
    req.session.data['disease-clearance-whelks']="Certifier";
    req.session.data['disease-clearance-other']="Certifier";
    res.render('form-builder/disease-clearance/1/commodity-group')
  })
  router.get('/disease-clearance-2/set-variables', function (req, res) {
  console.log("The GET is running1");
  req.session.data['disease-clearance-equine']="Certifier";
  req.session.data['disease-clearance-shellfish-group']="Certifier";

    req.session.data['disease-clearance-clams']="Certifier";
    req.session.data['disease-clearance-crabs']="Certifier";
    req.session.data['disease-clearance-crayfish']="Certifier";
    req.session.data['disease-clearance-lobster']="Certifier";
    req.session.data['disease-clearance-mixedshellfish']="Certifier";
    req.session.data['disease-clearance-molluscs']="Certifier";
    req.session.data['disease-clearance-mussels']="Certifier";
    req.session.data['disease-clearance-oysters']="Certifier";
    req.session.data['disease-clearance-prawns']="Certifier";
    req.session.data['disease-clearance-whelks']="Certifier";
    req.session.data['disease-clearance-other']="Certifier";
    res.render('form-builder/disease-clearance/2/commodity-group')
  })
  router.get('/conditional-routing-2/set-variables', function (req, res) {
  console.log("The GET is running1");
  req.session.data['disease-clearance-equine']="Certifier";
    req.session.data['disease-clearance-clams']="Certifier";
    req.session.data['disease-clearance-crabs']="Certifier";
    req.session.data['disease-clearance-crayfish']="Certifier";
    req.session.data['disease-clearance-lobster']="Certifier";
    req.session.data['disease-clearance-mixedshellfish']="Certifier";
    req.session.data['disease-clearance-molluscs']="Certifier";
    req.session.data['disease-clearance-mussels']="Certifier";
    req.session.data['disease-clearance-oysters']="Certifier";
    req.session.data['disease-clearance-prawns']="Certifier";
    req.session.data['disease-clearance-whelks']="Certifier";
    req.session.data['disease-clearance-other']="Certifier";
    res.render('form-builder/conditional-routing-2/reference-data-2/index')
  })

  router.post('/disease-clearance-2/commodity-routing', function (req, res) {
    console.log(req.session.data['commodity-group']);
    if (req.session.data['commodity-group']=="equine"){
res.redirect('/form-builder/disease-clearance/2/equine');
    }
    else {
res.redirect('/form-builder/disease-clearance/2/fish')
    }

  })


  //Conditional questions
  router.post('/beta/v8/conditional-questions-8270/question', function (req, res) {
    if (req.session.data['final-destination']=="EU"){
      res.redirect('/beta/v8/conditional-questions-8270/index-result-eu')
    }
    else {
      res.redirect('/beta/v8/conditional-questions-8270/index-result-third')
    }
  })

  //Conditional questions
  router.post('/beta/v8/conditional-questions-8322/question', function (req, res) {
    if (req.session.data['final-destination']=="EU"){
      res.redirect('/beta/v8/conditional-questions-8322ß/index-result-eu')
    }
    else {
      res.redirect('/beta/v8/conditional-questions-8270/index-result-third')
    }
  })


//Downtime notification admin
router.get('/index-with-notifications', function (req, res) {
  req.session.activenotifications = true;
    activenotifications = req.session.activenotifications;
  res.render('form-builder/notifications/index', { activenotifications })
})


router.post('/form-builder/notifications/add', function (req, res) {
  res.redirect('/index-with-notifications')
})

router.get('/delete-notification', function (req, res) {
  if (req.session.data['deletenotification']=="Yes"){
    activenotifications= false;
    console.log(activenotificatons);
  res.render('form-builder/notifications/index', { activenotifications })
}
else {
  activenotifications= true;
  console.log(activenotifications);
  res.render('form-builder/notifications/index', { activenotifications })
}
})

router.post('/delete-notification', function (req, res) {
  if (req.session.data['deletenotification']=="Yes"){
    activenotifications= false;
    console.log(activenotifications);
    res.redirect('/form-builder/notifications/index')
  }
  else {
    activenotifications= true;
    console.log(activenotifications);
    res.redirect('/index-with-notifications')
  }

})
//Conditonal routing - send certificate to different destination dependent on commodity
router.post('/form-builder/conditional-routing/certificate-destination/new-certificate/certificate-details', function (req, res) {
if (req.session.data.diseaseClearanceRequired == "RULE"){
  res.redirect('/form-builder/conditional-routing/certificate-destination/new-certificate/certificate-routing-alt')
}
else {
  res.redirect('/form-builder/conditional-routing/certificate-destination/new-certificate/upload')
}
})

router.post('/form-builder/conditional-routing/certificate-destination/new-certificate/commodity-types', function (req, res) {
  res.redirect('/form-builder/conditional-routing/certificate-destination/new-certificate/certificate-details')
})

//Manage rule journey - single rule - EXA
router.get('/manage-rules-single-exa/index-with-results', function (req, res) {
  req.session.activerules = true;
  activerules = req.session.activerules;
  console.log(activerules);
  res.render('form-builder/conditional-routing/manage-pages/manage-rules-single-exa/pages-list', { activerules })
})

router.post('/manage-rules-single-exa/delete-rule', function (req, res) {
  if (req.session.data['deleteruleexa']=="Yes"){
    activerules= false;
    console.log(activerules);
  }
  else {
    activerules= true;
    console.log(activerules);
  }
  res.redirect('/manage-rules-single-exa/index-deleted-items')
})

router.get('/manage-rules-single-exa/index-deleted-items', function (req, res) {
  console.log(activerules);
  res.render('form-builder/conditional-routing/manage-pages/manage-rules-single-exa/pages-list', { activerules })
})

//Manage rule journey - single rule - EHC
router.post('/form-builder/conditional-routing/manage-pages/index-single-rule', function (req, res) {
req.session.searchresults = false;
  searchresults = req.session.searchresults;
  console.log(searchresults);
  res.redirect('/form-builder/conditional-routing/manage-pages/manage-rules-single/create-rule-1')
})

router.get('/manage-rules-single/index-with-results', function (req, res) {
  req.session.activerules = true;
  activerules = req.session.activerules;
  console.log(activerules);
  res.render('form-builder/conditional-routing/manage-pages/index-single-rule', { activerules })
})

router.post('/manage-rules-single/delete-rule', function (req, res) {
  if (req.session.data['deleterule']=="Yes"){
    activerules= false;
    console.log(activerules);
  }
  else {
    activerules= true;
    console.log(activerules);
  }
  res.redirect('/manage-rules-single/index-deleted-items')
})

router.get('/manage-rules-single/index-deleted-items', function (req, res) {
  console.log("GET IS WORKING");
  res.render('form-builder/conditional-routing/manage-pages/index-single-rule', { activerules })
})


//Manage rules journey - Multiple
router.post('/form-builder/conditional-routing/manage-pages/index', function (req, res) {
req.session.searchresults = false;
  searchresults = req.session.searchresults;
  console.log(searchresults);
  res.redirect('/form-builder/conditional-routing/manage-pages/manage-rules/index')
})

router.get('/manage-rules/select-question-loader', function (req, res) {
  searchresults = req.session.searchresults;
  req.session.searchresults = true;
  res.render('form-builder/conditional-routing/manage-pages/manage-rules/create-rule-1', { searchresults })
})

router.get('/manage-rules/index-deleted-items', function (req, res) {
  console.log("GET IS WORKING");
  res.render('form-builder/conditional-routing/manage-pages/manage-rules/index', { activerules })
})

router.post('/form-builder/conditional-routing/manage-pages/manage-rules/delete', function (req, res) {
  res.redirect('/form-builder/conditional-routing/manage-pages/manage-rules/delete')
})

router.post('/manage-rules/delete-rule', function (req, res) {
  if (req.session.data['deleterule']=="Yes"){
    activerules= false;
    console.log(activerules);
  }
  else {
    activerules= true;
    console.log(activerules);
  }
  res.redirect('/manage-rules/index-deleted-items')
})


router.get('/manage-rules/index-with-results', function (req, res) {
  req.session.activerules = true;
  activerules = req.session.activerules;
  console.log(activerules);
  res.render('form-builder/conditional-routing/manage-pages/manage-rules/index', { activerules })
})

//No-QR journey v2
// **** Certificate number ***
router.get('/check-ehc-v2/before-you-start', function (req, res) {
  showlanguages = false;
  res.render('check-ehc-v2/before-you-start', { uniquecodeerror, showlanguages})
})

router.get('/check-ehc-v2/unique-code', function (req, res) {
  res.render('check-ehc-v2/unique-code', { uniquecodeerror, showlanguages})
})
router.post('/check-ehc-v2/unique-code', function (req, res) {
  uniquecode = req.session.data['unique-code'];
  uniquecodeparsed = uniquecode.replace(/-/g, "");
  console.log(uniquecodeparsed.charAt(0));
  if (uniquecodeparsed.charAt(0) == 3){
    res.redirect('/check-ehc-v2/daera');
  }
  else if (uniquecodeparsed.length !== 12 ){
    uniquecodeerror = true;
    if (uniquecodeparsed == "212345678905"){
      uniquecodecorrect = true;
      console.log("Correct unique code");
    }
    else {
      uniquecodecorrect = false;
      console.log("Incorrect unique code");
    }
    res.redirect('/check-ehc-v2/unique-code');
  }
else {
  uniquecodeerror = false;
  if (uniquecodeparsed == "212345678905"){
    uniquecodecorrect = true;
    console.log("Correct unique code");
  }
  else {
    console.log("Incorrect code");
    uniquecodecorrect = false;
  }
res.redirect('/check-ehc-v2/certificate-number');
}
})

router.get('/check-ehc-v2/certificate-number', function (req, res) {
  res.render('check-ehc-v2/certificate-number', { certificatenumbererror, showlanguages })
})

router.post('/check-ehc-v2/certificate-number', function (req, res) {
  certificatenumber = req.session.data['certificate-number'];
  certificatenumberparsed = certificatenumber.replace(/\//g, "");
    console.log(certificatenumberparsed);
  if (certificatenumberparsed.length !== 9 ){
    certificatenumbererror = true;
    res.redirect('/check-ehc-v2/certificate-number');
  }
else {
  console.log("Second if block");
  certificatenumbererror = false;
  if (certificatenumberparsed == "202176582"){
    certificatenumbercorrect = true;
    console.log("Correct certificate number");
    if (uniquecodecorrect == true) {
      res.redirect('/check-ehc-v2/valid');
    }
    else {
      res.redirect('/check-ehc-v2/invalid');
    }
  }
  else {
    certificatenumbercorrect = false;
    console.log("Incorrect certificate number");
    res.redirect('/check-ehc-v2/invalid');
  }

}
})

router.post('/check-ehc-v2/unique-code', function (req, res) {
  var reference = req.session.data['unique-code'];
  certificatefallback = true;
  console.log(reference);
  switch(reference) {
case "1234-5678-9101":
  res.redirect('/check-ehc-v2/valid');
  break;
case "123456789101":
  res.redirect('/check-ehc-v2/valid');
  break;
case "1567-2876-9982":
  res.redirect('/check-ehc-v2/valid');
  break;
case "156728769982":
  res.redirect('/check-ehc-v2/valid');
  break;
default:
res.redirect('/check-ehc-v2/invalid');
}

})


router.post('/check-ehc-internationalisation/select-language', function (req, res) {
showlanguages = true;
  res.redirect('/check-ehc-v2/unique-code')
})


  //No-QR journey
  // **** Certificate number ***
  router.post('/check-ehc/certificate-number', function (req, res) {
      res.redirect('/check-ehc/unique-code')
  })

  router.post('/check-ehc/unique-code', function (req, res) {
    var reference = req.session.data['unique-code'];
    certificatefallback = true;
    console.log(reference);
    switch(reference) {
  case "1234-5678-9101":
    res.redirect('/check-ehc/valid');
    break;
  case "123456789101":
    res.redirect('/check-ehc/valid');
    break;
  case "1567-2876-9982":
    res.redirect('/check-ehc/valid');
    break;
  case "156728769982":
    res.redirect('/check-ehc/valid');
    break;
  default:
  res.redirect('/check-ehc/invalid');
}

  })

  // **** Certificate number ***
  router.post('/certificate-number-handler', function (req, res) {
    if (certificatefallback == true) {
      res.redirect('/beta/v8/qr-lookup/unique-code')
    } else {
        res.redirect('/beta/v8/qr-lookup/contents')
    }
  })

  router.get('/beta/v8/qr-lookup/before-you-start', function (req, res) {
    req.session.certificatefallback = false;
    certificatefallback = req.session.certificatefallback
    res.render('beta/v8/qr-lookup/before-you-start', { certificatefallback })
  })

  router.get('/beta/v8/qr-lookup/unique-code', function (req, res) {
    req.session.certificatefallback = true;
    certificatefallback = req.session.certificatefallback
    res.render('beta/v8/qr-lookup/unique-code', { certificatefallback })
  })

  router.get('/beta/v8/qr-lookup/contents', function (req, res) {
    req.session.certificatefallback = false;
    certificatefallback = req.session.certificatefallback
    res.render('beta/v8/qr-lookup/contents', { certificatefallback })
  })

  router.get('/beta/v8/qr-lookup/before-you-start-fallback', function (req, res) {
    req.session.certificatefallback = true;
    certificatefallback = req.session.certificatefallback
    res.render('beta/v8/qr-lookup/before-you-start', { certificatefallback })
  })

  router.get('/check-ehc/invalid', function (req, res) {
    res.render('check-ehc/invalid', { certificatefallback })
  })
  // **** cloning ***
  router.post('/' + base_url + '*/clone', function(req, res) {
    var copy = req.session.data.copy_as_new || ""
    if (req.body.application_type == "clone") {
      req.session.data = []

      res.redirect(301, '/' + base_url + req.params[0] + '/certificate/reference-update?certificate=ehc6969&alert=cloned&copy_as_new=' + copy);
    } else {
      res.redirect(301, '/' + base_url + req.params[0] + '/dashboard');
    }

  })

  // **** Check your answers and check your progress ****
  router.get('/' + base_url + '*/certificate/check-your-*', function(req, res) {
    // Same code for both check you progress and check your answers
    // req.params[1] is the second wide card. In this case it will be the remaining URL after check-your-{whatever this is}
    res.render(base_url + req.params[0] + '/certificate/check-your-' + req.params[1], {
      "query": req.query,
      "db": req.session.db
    }, function(err, html) {
      // Loads from the core folder if this page doesnt exist in the current folder
      if (err) {
        if (err.message.indexOf('template not found') !== -1) {
          //Get page from core
          return res.render(file_url + '/certificate/check-your-' + req.params[1], {
            "query": req.query,
            "db": req.session.db
          });
        }
        throw err;
      }
      //render page
      res.send(html);
    })
  });


  router.post('/' + base_url + '*/certificate/exa/certifier-confirm-address', function(req, res) {
    req.session.data.file_id_count += 1
    var printable = req.session.db.printable
    console.log("printable= "+printable)
    if (req.session.data.certifier_has_cg_paper == "yes" || (req.session.data.certifier_is_digital == "yes" && printable == "yes") ) {
      res.redirect(301, '/' + base_url + req.params[0] + '/certificate/check-your-progress');
    }
    if (req.body.is_certifier_address_correct == "yes") {
        res.redirect(301, '/' + base_url + req.params[0] + '/certificate/exa/certifier-certificate-delivery?printable='+printable);

    } else {
      res.redirect(301, '/' + base_url + req.params[0] + '/certificate/exa/certifier-new-address');
    }
  })
  router.post('/' + base_url + '*/certificate/need-pre-cert', function(req, res) {
    var printable = req.session.db.printable
    if((req.query.change =="yes" )){
      res.redirect(301, '/' + base_url + req.params[0] + '/certificate/check-your-answers');
    }
    if((printable != "yes" || req.query.printable =="no" ) && req.session.data.certifier_has_cg_paper != "yes" && req.body.needs_pre_cert == "yes"){
      res.redirect(301, '/' + base_url + req.params[0] + '/certificate/need-pre-cert-paper');
    }
    else {
      res.redirect(301, '/' + base_url + req.params[0] + '/certificate/check-your-progress');
    }
  })
  router.post('/' + base_url + '*/certificate/exa/certifier-new-address', function(req, res) {
    req.session.data.file_id_count += 1
    var printable = req.session.db.printable

    if (req.session.data.certifier_has_cg_paper == "yes" || (req.session.data.certifier_is_digital == "yes" && printable == "yes") ) {
      res.redirect(301, '/' + base_url + req.params[0] + '/certificate/check-your-progress');
    }else{
        res.redirect(301, '/' + base_url + req.params[0] + '/certificate/exa/certifier-certificate-delivery?printable='+printable);
    }

  })

  router.get('/' + base_url + '*/select-certificate', function(req, res) {
    res.render(base_url + req.params[0] + '/select-certificate', {
      "query": req.query,
      "db": db
    }, function(err, html) {
      if (err) {
        if (err.message.indexOf('template not found') !== -1) {
          return res.render(file_url + '/select-certificate', {
            "query": req.query,
            "db": db
          });
        }
        throw err;
      }
      res.send(html);
    })
  })
  router.get('/' + base_url + '*/contents', function(req, res) {
    res.render(base_url + req.params[0] + '/contents', {
      "query": req.query,
      "db": db
    }, function(err, html) {
      if (err) {
        if (err.message.indexOf('template not found') !== -1) {
          return res.render(file_url + '/contents', {
            "query": req.query,
            "db": db
          });
        }
        throw err;
      }
      res.send(html);
    })
  })

  router.post('/' + base_url + '*/choose-certificate', function(req, res) {
    if (req.body.certificate != "different") {
      res.redirect(301, '/' + base_url + req.params[0] + '/certificate/check-your-progress?certificate=' + req.body.certificate);
    } else {
      res.redirect(301, '/' + base_url + req.params[0] + '/start/form-finder?logged_in=yes&keywords=');
    }
  })



  // PAGE: this is a dynamic page generated by the Certifcate data base in "app/data/certificates/"
  // note: if you are working from a different folder to CORE then you will need to add a duplicate of the includes folder. [folder]/certificate/partials
  router.get('/' + base_url + '*/certificate/page', function(req, res) {
    console.log("get page called")
    var id = parseInt(req.query.id) || 0;
    res.render(base_url + req.params[0] + '/certificate/page', {
      "query": req.query,
      "page": tools.findPage(tools.getDB(req.session.database, db).data.pages, id)
    }, function(err, html) {
      if (err) {
        if (err.message.indexOf('template not found') !== -1) {
          console.log("Could not find " + base_url + req.params[0] + '/certificate/page' + ": Loading from main folder")
          return res.render(file_url + '/certificate/page', {
            "query": req.query,
            "page": tools.findPage(tools.getDB(req.session.database, db).data.pages, id)
          });
        }
        throw err;
      }
      res.send(html);
    })
  })
  router.post('/' + base_url + "*/certificate/page", function(req, res) {

    var query = ""
    var page = tools.findPage(tools.getDB(req.session.database, db).data.pages, req.query.id)
    var page_name = page.title

    req.session.data.empty = []
    //check if anthing is empty
    req.session.data.empty = tools.getBlankFields(req.body)
    // console.log(tools.getDB(req.session.data.database,db).data.pages[req.query.id])

    // Show error message if the user has left anything blank and not skipped
    req.body.skip_answers = req.body.skip_answers || []
    if (req.session.data.empty.length > 0 && !req.body.skip_answers.includes('skip') && page.exa != "yes") {

      // ensure this page has been removed from the skipped list (used in check your progress)
      req.session.data.skipped = req.session.data.skipped.filter(e => e !== page_name)
      return res.redirect(301, '/' + base_url + req.params[0] + '/certificate/page?id=' + req.query.id + '&next=' + req.query.next + '&hasError=yes');
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
  // your-commmodities
  router.get('/' + base_url + '*/certificate/exa/your-commodity', function(req, res) {
    res.render(base_url + req.params[0] + '/certificate/exa/your-commodity', {
      "query": req.query,
      "commodities": tools.getDB(req.session.database, db).data.commodities
    }, function(err, html) {
      if (err) {
        if (err.message.indexOf('template not found') !== -1) {
          return res.render(file_url + '/certificate/exa/your-commodity', {
            "query": req.query,
            "commodities": tools.getDB(req.session.database, db).data.commodities
          });
        }
        throw err;
      }
      res.send(html);
    })
  })
  router.get('/' + base_url + '*/certificate/product-list', function(req, res) {
    var id = req.query.id || 2;
    console.log("older version product list")
    var product = tools.findPage(tools.getDB(req.session.database, db).data.pages, id)
    if (req.query.delete) {
      console.log("removing : " + req.query.delete)
      console.log(req.session.data.products.splice(req.query.delete, 1))
      console.log(req.session.data.products.length)
    }
    res.render(base_url + req.params[0] + '/certificate/product-list', {
      "query": req.query,
      "product": product
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

  router.get('/' + base_url + '*/certificate/supporting-documents', function(req, res) {
    if (req.query.delete) {
      tools.removeFromList(req.session.data.uploaded_files, req.query.delete)
    }
    res.render(base_url + req.params[0] + '/certificate/supporting-documents', {
      "query": req.query
    }, function(err, html) {
      if (err) {
        if (err.message.indexOf('template not found') !== -1) {
          return res.render(file_url + '/certificate/supporting-documents');
        }
        throw err;
      }
      res.send(html);
    })
  })


  // Supporting document page
  router.post('/' + base_url + '*certificate/supporting-documents', function(req, res) {
    req.session.data.file_id_count += 1

    var query = "?"
    // if content add to addtoArray
    var file = req.body.file || "test_supporting_document.docx";
    var description = req.body.file_description || ""
    var id = req.session.data.file_id_count
    if (tools.isDupucate(req.session.data.uploaded_files, file)) {
      query += "hasError=true&errorType=duplicate"
    } else {
      // add uploaded file.
      req.session.data.uploaded_files.push({
        "name": file,
        "description": description,
        "ID": id
      })
    }
    res.redirect(301, '/' + base_url + req.params[0] + 'certificate/supporting-documents' + query);
  })
  router.post('/' + base_url + '*start-page/google-search-results', function(req, res) {
    var s = req.body.search.toUpperCase()
    if (s.includes('CERTIFY') || s.includes('CERTIFIER') || s.includes('VET') || s.includes('OV') || s.includes('INSPECT') || s.includes('EHO')) {
      res.redirect(301, '/' + base_url + req.params[0] + 'start-page/google-search-results-certifier?search=' + req.body.search);
    } else {
      res.redirect(301, '/' + base_url + req.params[0] + 'start-page/google-search-results?search=' + req.body.search);
    }
  })


  router.post('/' + base_url + '*certificate/how-to-add-products', function(req, res) {
    if (req.body.add_product_method == "manually") {
      res.redirect(301, '/' + base_url + req.params[0] + 'certificate/page?id='+req.query.id+"&next=product-list&product_page=yes&new=no");
    } else {
      res.redirect(301, '/' + base_url + req.params[0] + 'certificate/supporting-documents?test=yes;');
    }
  })

  // router.post('/' + base_url + '*start-page/govuk-*', function(req, res) {
  //   console.log("----- searching -----")
  //   var s = req.body.keywords.toUpperCase()
  //   console.log("search term = "+s)
  //   if(s.includes('CERTIFY') || s.includes('CERTIFIER') || s.includes('VET') || s.includes('OV') || s.includes('INSPECT') || s.includes('EHO')){
  //     res.redirect(301, '/' + base_url + req.params[0] + 'start-page/govuk-search-results?search='+req.body.search);
  //   }else{
  //     res.redirect(301, '/' + base_url + req.params[0] + 'start-page/google-search-results?search='+req.body.search);
  //   }
  // })

  // this adds query to all pages and will be used if no other get routing exists to override this.
  router.get('/' + base_url + '*', function(req, res) {
    console.log("default GET routing page for: " + base_url + req.params[0])
    var dir = req.params[0].split(/\/+/g);
    // Remove the main folder from URL
    dir.shift()
    var baseDir = ""
    dir.forEach(function(element) {
      var path = "/" + element
      baseDir += path
    })

    // Attempt to render a page in the current folder
    res.render(base_url + req.params[0], {
      "query": req.query,
      "db": req.session.db
    }, function(err, html) {
      // If the page doesnt exist in current folder, attempt to render a page from the "core folder"
      // This reduces space of duplicating the whole folder
      if (err) {
        if (err.message.indexOf('template not found') !== -1) {
          console.log("No page in directory.attempting to load from core")
          return res.render(file_url + baseDir, {
            "query": req.query,
            "db": req.session.db
          });
        }
        throw err;
      }
      res.send(html);
    });
  })

}
