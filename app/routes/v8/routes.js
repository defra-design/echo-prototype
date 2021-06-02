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
  var languageselected;
  var languagechange;


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
  console.log("The GET is running!");
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
      res.redirect('/beta/v8/conditional-questions-8322/index-result-eu')
    }
    else {
      res.redirect('/beta/v8/conditional-questions-8322/index-result-third')
    }
  })


//Downtime notification admin
/* 
router.get('/index-with-notifications', function (req, res) {
  req.session.activenotifications = true;
    activenotifications = req.session.activenotifications;
  res.render('form-builder/notifications/index', { activenotifications })
})
 */

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

router.get('/index-with-notifications', function (req, res) {
  req.session.activenotifications = true;
  activenotifications = req.session.activenotifications;
  res.render('form-builder/notifications/index', { 
    activenotifications,
    results:messagesAudit
  })
});

// In-system messages
let messagesAudit = [
  { user: "Douglas Labella", message: "Warning. The service will be unavailable from 01 August 2021 until 04 August 2021 due to maintenance.", alert: "Warning", audience: "Exporters", dateCreated: "11 Dec 2019", dateAmended: "17 Dec 2019", dateRemoved:"-", dateStart: "20 May 2021 at 8:00pm ", dateEnd: "27 May 2021 at 12:01am ", status:"Live", tag:"govuk-tag govuk-tag--red " },
  { user: "Teresa Randell", message: "The service will be unavailable from 01 August 2021 until 04 August 2021 due to maintenance.", alert: "Information", audience: "Certifiers", dateCreated: "11 Dec 2019", dateAmended: "15 Dec 2019", dateRemoved:"-", dateStart: "20 May 2021 at 8:00pm ", dateEnd: "27 May 2021 at 12:01am ", status:"Live", tag:"govuk-tag"  },
  { user: "Corl Fogleman", message: "The service will be unavailable from 01 August 2021 until 04 August 2021 due to maintenance.", alert: "Information", audience: "Both ", dateCreated: "11 Dec 2019", dateAmended: "13 Dec 2019", dateRemoved:"-" , dateStart: "", dateEnd: " ", status:"Draft", tag:"govuk-tag--grey" },
  { user: "Nicholle Cranford", message: "You can now request a pre-certificate if you need an official copy of the certificate before APHA processes your application.", alert: "Warning", audience: "Exporters", dateCreated: "11 Dec 2019", dateAmended: "-", dateRemoved:"1 Jan 2020", dateStart: "04 Aug 2021 at 8:00pm ", dateEnd: " ", status:"Pending", tag:"govuk-tag--green"  },
  { user: "Lisa Kantar", message: "Planned maintenance on 20 December 2020 at 6pm. You will not be able to use the service at this time. ", alert: "Warning", audience: "Exporters", dateCreated: "11 Dec 2019", dateAmended: "-", dateRemoved:"1 Jan 2020", dateStart: "", dateEnd: "", status:"Draft", tag:"govuk-tag--grey"  },
  { user: "Douglas Labella", message: "You can now request a pre-certificate if you need an official copy of the certificate before APHA processes your application.", alert: "Information", audience: "Exporters", dateCreated: "11 Dec 2019", dateAmended: "17 Dec 2019", dateRemoved:"-", dateStart: "16 Jul 2021 at 8:00pm ", dateEnd: "17 Jul 2021 at 12:01am ", status:"Pending", tag:"govuk-tag--green"  },
  { user: "Teresa Randell", message: "The service will be unavailable from 01 August 2021 until 04 August 2021 due to maintenance.", alert: "Information", audience: "Both", dateCreated: "11 Dec 2019", dateAmended: "15 Dec 2019", dateRemoved:"-", dateStart: "", dateEnd: "", status:"Draft", tag:"govuk-tag--grey" },
  { user: "Corl Fogleman", message: "You can now request a pre-certificate if you need an official copy of the certificate before APHA processes your application.", alert: "Information", audience: "Certifiers ", dateCreated: "11 Dec 2019", dateAmended: "13 Dec 2019", dateRemoved:"-" , dateStart: "", dateEnd: "", status:"Draft", tag:"govuk-tag--grey" },
  { user: "Nicholle Cranford", message: "You can now request a pre-certificate if you need an official copy of the certificate before APHA processes your application.", alert: "Warning", audience: "Exporters", dateCreated: "11 Dec 2019", dateAmended: "-", dateRemoved:"1 Apr 2020", dateStart: "4 Apr 2020", dateEnd: "6 Apr 2020", status:"Expired", tag:"govuk-tag--red"  },
  { user: "Lisa Kantar", message: "Planned maintenance on 20 December 2020 at 6pm. You will not be able to use the service at this time. ", alert: "Warning", audience: "Certifiers ", dateCreated: "11 Dec 2019", dateAmended: "-", dateRemoved:"1 Jan 2020", dateStart: "1 Jan 2020", dateEnd: "4 Jan 2020", status:"Expired", tag:"govuk-tag--red"  },
];


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

//Check and EHC - No-QR journey v2
// **** Certificate number ***
router.get('/check-ehc-v2/before-you-start', function (req, res) {
  showlanguages = false;
  res.render('check-ehc-v2/before-you-start', { uniquecodeerror, showlanguages})
})

router.get('/check-ehc-v2/unique-code', function (req, res) {
  res.render('check-ehc-v2/unique-code', { uniquecodeerror, showlanguages, languageselected, languagechange})
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
  res.render('check-ehc-v2/certificate-number', { certificatenumbererror, showlanguages, languageselected, languagechange })
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

//CHECK an EHC - Internationalisaton 
router.post('/check-ehc-internationalisation/select-language', function (req, res) {
showlanguages = true;
if (req.session.data['language-select']=="language-select-10"){
  languageselected = "Français"
  languagechange = "Changer de langue"
}
else {
  languageselected = "English"
  languagechange = "Change language"
}
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


    let options = [
      {code:"0304000000",  title:"Fish fillets and other fish meat (whether or not minced), fresh, chilled or frozen"},
      {code:"0304310000",  title:"Fresh or chilled fillets of tilapias (Oreochromis spp.), catfish (Pangasius spp., Silurus spp., Clarias spp., Ictalurus spp.), carp (Cyprinus spp., Carassius spp., Ctenopharyngodon idellus, Hypophthalmichthys spp., Cirrhinus spp., Mylopharyngodon piceus, Catla catla, Labeo spp., Osteochilus hasselti, Leptobarbus hoeveni, Megalobrama spp.), eels (Anguilla spp.), Nile perch (Lates niloticus) and snakeheads (Channa spp.)"},
      {code:"0304310000",  title:"Tilapias (Oreochromis spp.)"},
      {code:"0304320000",  title:"Catfish (Pangasius spp., Silurus spp., Clarias spp., Ictalurus spp.)"},
      {code:"0304320010",  title:"Pangasius (Pangasius spp.)"},
      {code:"0304320090",  title:"Other"},
      {code:"0304330000",  title:"Nile perch (Lates niloticus)"},
      {code:"0304390000",  title:"Other"},
      {code:"0304390010",  title:"Eels (Anguilla spp.)"},
      {code:"0304390020",  title:"Carp (Cyprinus carpio, Carassius carassius, Ctenopharyngodon idellus, Hypophthalmichthys spp., Cirrhinus spp., Mylopharyngodon piceus)"},
      {code:"0304390090",  title:"Other"},
      {code:"0304410000",  title:"Fresh or chilled fillets of other fish"},
      {code:"0304410000",  title:"Pacific salmon (Oncorhynchus nerka, Oncorhynchus gorbuscha, Oncorhynchus keta, Oncorhynchus tschawytscha, Oncorhynchus kisutch, Oncorhynchus masou and Oncorhynchus rhodurus), Atlantic salmon (Salmo salar) and Danube salmon (Hucho hucho)"},
      {code:"0304410010",  title:"Atlantic salmon (Salmo salar)"},
      {code:"0304410090",  title:"Other"},
      {code:"0304420000",  title:"Trout (Salmo trutta, Oncorhynchus mykiss, Oncorhynchus clarki, Oncorhynchus aguabonita, Oncorhynchus gilae, Oncorhynchus apache and Oncorhynchus chrysogaster)"},
      {code:"0304421000",  title:"Of the species Oncorhynchus mykiss, weighing more than 400 g each"},
      {code:"0304425000",  title:"Of the species Oncorhynchus apache or Oncorhynchus chrysogaster"},
      {code:"0304429000",  title:"Other"},
      {code:"0304429010",  title:"Of the species Oncorhynchus mykiss"},
      {code:"0304429090",  title:"Other"},
      {code:"0304430000",  title:"Flat fish (Pleuronectidae, Bothidae, Cynoglossidae, Soleidae, Scophthalmidae and Citharidae)"},
      {code:"0304430010",  title:"Of lesser or Greenland halibut (Reinhardtius hippoglossoides) and of Atlantic halibut (Hippoglossus hippoglossus)"},
      {code:"0304430090",  title:"Other"},
      {code:"0304440000",  title:"Fish of the families Bregmacerotidae, Euclichthyidae, Gadidae, Macrouridae, Melanonidae, Merlucciidae, Moridae and Muraenolepididae"},
      {code:"0304441000",  title:"Cod (Gadus morhua, Gadus ogac, Gadus macrocephalus) and Polar cod (Boreogadus saida)"},
      {code:"0304441010",  title:"Of the species Gadus morhua"},
      {code:"0304441090",  title:"Other"},
      {code:"0304443000",  title:"Coalfish (Pollachius virens)"},
      {code:"0304449000",  title:"Other"},
      {code:"0304449010",  title:"Haddock (Melanogrammus aeglefinus)"},
      {code:"0304449090",  title:"Other"},
      {code:"0304450000",  title:"Swordfish (Xiphias gladius)"},
      {code:"0304460000",  title:"Toothfish (Dissostichus spp.)"},
      {code:"0304470000",  title:"Dogfish and other sharks"},
      {code:"0304471000",  title:"Piked dogfish (Squalus acanthias) and catsharks (Scyliorhinus spp.)"},
      {code:"0304472000",  title:"Porbeagle shark (Lamna nasus)"},
      {code:"0304473000",  title:"Blue shark (Prionace glauca)"},
      {code:"0304479000",  title:"Other"},
      {code:"0304480000",  title:"Rays and skates (Rajidae)"},
      {code:"0304490000",  title:"Other"},
      {code:"0304491000",  title:"Freshwater fish"},
      {code:"0304495000",  title:"Other"},
      {code:"0304495000",  title:"Redfish (Sebastes spp.)"},
      {code:"0304499000",  title:"Other"},
      {code:"0304499010",  title:"Herrings"},
      {code:"0304499020",  title:"Mackerel"},
      {code:"0304499030",  title:"Bluefin tunas (Thunnus thynnus)"},
      {code:"0304499040",  title:"Atlantic bigeye tuna (Thunnus obesus)"},
      {code:"0304499050",  title:"Gilt-head sea bream (Sparus aurata)"},
      {code:"0304499060",  title:"Sea bream (Dentex dentex and Pagellus spp.)"},
      {code:"0304499070",  title:"European sea bass (Dicentrarchus labrax)"},
      {code:"0304499090",  title:"Other"},
      {code:"0304510000",  title:"Other, fresh or chilled"},
      {code:"0304510000",  title:"Tilapias (Oreochromis spp.), catfish (Pangasius spp., Silurus spp., Clarias spp., Ictalurus spp.), carp (Cyprinus spp., Carassius spp., Ctenopharyngodon idellus, Hypophthalmichthys spp., Cirrhinus spp., Mylopharyngodon piceus, Catla catla, Labeo spp., Osteochilus hasselti, Leptobarbus hoeveni, Megalobrama spp.), eels (Anguilla spp.), Nile perch (Lates niloticus) and snakeheads (Channa spp.)"},
      {code:"0304510010",  title:"Carp (Cyprinus carpio, Carassius carassius, Ctenopharyngodon idellus, Hypophthalmichthys spp., Cirrhinus spp., Mylopharyngodon piceus)"},
      {code:"0304510090",  title:"Other"},
      {code:"0304520000",  title:"Salmonidae"},
      {code:"0304520010",  title:"Trout of the species Salmo trutta, Oncorhynchus mykiss, Oncorhynchus clarki, Oncorhynchus aguabonita, Oncorhynchus gilae, Oncorhynchus apache and Oncorhynchus chrysogaster"},
      {code:"0304520090",  title:"Other"},
      {code:"0304530000",  title:"Fish of the families Bregmacerotidae, Euclichthyidae, Gadidae, Macrouridae, Melanonidae, Merlucciidae, Moridae and Muraenolepididae"},
      {code:"0304530011",  title:"Cod (Gadus morhua, Gadus ogac, Gadus macrocephalus) and fish of the species Boreogadus saida"},
      {code:"0304530011",  title:"Of the species Gadus morhua"},
      {code:"0304530019",  title:"Other"},
      {code:"0304530020",  title:"Coalfish (Pollachius virens)"},
      {code:"0304530031",  title:"Haddock (Melanogrammus aeglefinus)"},
      {code:"0304530031",  title:"For processing"},
      {code:"0304530039",  title:"Other"},
      {code:"0304530090",  title:"Other"},
      {code:"0304540000",  title:"Swordfish (Xiphias gladius)"},
      {code:"0304550000",  title:"Toothfish (Dissostichus spp.)"},
      {code:"0304560000",  title:"Dogfish and other sharks"},
      {code:"0304561000",  title:"Piked dogfish (Squalus acanthias) and catsharks (Scyliorhinus spp.)"},
      {code:"0304562000",  title:"Porbeagle shark (Lamna nasus)"},
      {code:"0304563000",  title:"Blue shark (Prionace glauca)"},
      {code:"0304569000",  title:"Other"},
      {code:"0304570000",  title:"Rays and skates (Rajidae)"},
      {code:"0304590000",  title:"Other"},
      {code:"0304591000",  title:"Freshwater fish"},
      {code:"0304595000",  title:"Other"},
      {code:"0304595000",  title:"Flaps of herring"},
      {code:"0304595010",  title:"Herring of the species Clupea harengus and Clupea pallasii, of a weight exceeding 80 g per piece, for industrial manufacture"},
      {code:"0304595090",  title:"Other"},
      {code:"0304599000",  title:"Other"},
      {code:"0304599010",  title:"Herrings"},
      {code:"0304599015",  title:"Atlantic bluefin tunas (Thunnus thynnus)"},
      {code:"0304599020",  title:"Bigeye tuna (Thunnus obesus)"},
      {code:"0304599030",  title:"Lesser or Greenland halibut (Reinhardtius hippoglossoides)"},
      {code:"0304599035",  title:"Atlantic halibut (Hippoglossus hippoglossus)"},
      {code:"0304599040",  title:"Sea bream (Dentex dentex, Pagellus spp.)"},
      {code:"0304599045",  title:"European sea bass (Dicentrarchus labrax)"},
      {code:"0304599050",  title:"Redfish (Sebastes spp.)"},
      {code:"0304599055",  title:"Bogue (Boops boops)"},
      {code:"0304599065",  title:"Gilt-head sea bream (Sparus aurata)"},
      {code:"0304599090",  title:"Other"},
      {code:"0304610000",  title:"Frozen fillets of tilapias (Oreochromis spp.), catfish (Pangasius spp., Silurus spp., Clarias spp., Ictalurus spp.), carp (Cyprinus spp., Carassius spp., Ctenopharyngodon idellus, Hypophthalmichthys spp., Cirrhinus spp., Mylopharyngodon piceus, Catla catla, Labeo spp., Osteochilus hasselti, Leptobarbus hoeveni, Megalobrama spp.), eels (Anguilla spp.), Nile perch (Lates niloticus) and snakeheads (Channa spp.)"},
      {code:"0304610000",  title:"Tilapias (Oreochromis spp.)"},
      {code:"0304620000",  title:"Catfish (Pangasius spp., Silurus spp., Clarias spp., Ictalurus spp.)"},
      {code:"0304630000",  title:"Nile perch (Lates niloticus)"},
      {code:"0304690000",  title:"Other"},
      {code:"0304690010",  title:"Eels (Anguilla spp.)"},
      {code:"0304690020",  title:"Carp (Cyprinus carpio, Carassius carassius, Ctenopharyngodon idellus, Hypophthalmichthys spp., Cirrhinus spp., Mylopharyngodon piceus)"},
      {code:"0304690090",  title:"Other"},
      {code:"0304710000",  title:"Frozen fillets of fish of the families Bregmacerotidae, Euclichthyidae, Gadidae, Macrouridae, Melanonidae, Merlucciidae, Moridae and Muraenolepididae"},
      {code:"0304710000",  title:"Cod (Gadus morhua, Gadus ogac, Gadus macrocephalus)"},
      {code:"0304711000",  title:"Cod of the species Gadus macrocephalus"},
      {code:"0304711010",  title:"For processing"},
      {code:"0304711090",  title:"Other"},
      {code:"0304719000",  title:"Other"},
      {code:"0304719010",  title:"Cod of the species Gadus morhua"},
      {code:"0304719010",  title:"For processing"},
      {code:"0304719030",  title:"Other"},
      {code:"0304719090",  title:"Cod of the species Gadus ogac"},
      {code:"0304720000",  title:"Haddock (Melanogrammus aeglefinus)"},
      {code:"0304730000",  title:"Coalfish (Pollachius virens)"},
      {code:"0304740000",  title:"Hake (Merluccius spp., Urophycis spp.)"},
      {code:"0304741100",  title:"Hake of the genus Merluccius"},
      {code:"0304741100",  title:"Cape hake (shallow-water hake) (Merluccius capensis) and deepwater hake (deepwater Cape hake) (Merluccius paradoxus)"},
      {code:"0304741500",  title:"Argentine hake (Southwest Atlantic hake) (Merluccius hubbsi)"},
      {code:"0304741510",  title:"For processing"},
      {code:"0304741590",  title:"Other"},
      {code:"0304741900",  title:"Other"},
      {code:"0304741910",  title:"North Pacific hake (Merluccius productus), for processing"},
      {code:"0304741990",  title:"Other"},
      {code:"0304749000",  title:"Hake of the genus Urophycis"},
      {code:"0304750000",  title:"Alaska pollock (Theragra chalcogramma)"},
      {code:"0304750010",  title:"For processing"},
      {code:"0304750090",  title:"Other"},
      {code:"0304790000",  title:"Other"},
      {code:"0304791000",  title:"Polar cod (Boreogadus saida)"},
      {code:"0304793000",  title:"Whiting (Merlangius merlangus)"},
      {code:"0304795000",  title:"Blue grenadier (Macruronus novaezelandiae)"},
      {code:"0304795010",  title:"For processing"},
      {code:"0304795090",  title:"Other"},
      {code:"0304798000",  title:"Ling (Molva spp.)"},
      {code:"0304799000",  title:"Other"},
      {code:"0304799011",  title:"Fish of the genus Macruronus, other than blue grenadier (Macruronus novaezelandiae) mentioned in subheading 0304 79 50"},
      {code:"0304799011",  title:"Patagonian grenadier (Macruronus magellanicus)"},
      {code:"0304799011",  title:"For processing"},
      {code:"0304799013",  title:"Other"},
      {code:"0304799017",  title:"Other"},
      {code:"0304799017",  title:"For processing"},
      {code:"0304799019",  title:"Other"},
      {code:"0304799090",  title:"Other"},
      {code:"0304810000",  title:"Frozen fillets of other fish"},
      {code:"0304810000",  title:"Pacific salmon (Oncorhynchus nerka, Oncorhynchus gorbuscha, Oncorhynchus keta, Oncorhynchus tschawytscha, Oncorhynchus kisutch, Oncorhynchus masou and Oncorhynchus rhodurus), Atlantic salmon (Salmo salar) and Danube salmon (Hucho hucho)"},
      {code:"0304810010",  title:"Atlantic salmon (Salmo salar)"},
      {code:"0304810090",  title:"Other"},
      {code:"0304820000",  title:"Trout (Salmo trutta, Oncorhynchus mykiss, Oncorhynchus clarki, Oncorhynchus aguabonita, Oncorhynchus gilae, Oncorhynchus apache and Oncorhynchus chrysogaster)"},
      {code:"0304821000",  title:"Of the species Oncorhynchus mykiss, weighing more than 400 g each"},
      {code:"0304825000",  title:"Of the species Oncorhynchus apache or Oncorhynchus chrysogaster"},
      {code:"0304829000",  title:"Other"},
      {code:"0304829010",  title:"Of the species Oncorhynchus mykiss"},
      {code:"0304829090",  title:"Other"},
      {code:"0304830000",  title:"Flat fish (Pleuronectidae, Bothidae, Cynoglossidae, Soleidae, Scophthalmidae and Citharidae)"},
      {code:"0304831000",  title:"Plaice (Pleuronectes platessa)"},
      {code:"0304833000",  title:"Flounder (Platichthys flesus)"},
      {code:"0304835000",  title:"Megrim (Lepidorhombus spp.)"},
      {code:"0304839000",  title:"Other"},
      {code:"0304839011",  title:"Halibut (Reinhardtius hippoglossoides, Hippoglossus hippoglossus, Hippoglossus stenolepis)"},
      {code:"0304839011",  title:"Reinhardtius hippoglossoides"},
      {code:"0304839019",  title:"Other"},
      {code:"0304839021",  title:"Flat fish (Limanda aspera, Lepidopsetta bilineata, Pleuronectes quadrituberculatus, Limanda ferruginea, Lepidopsetta polyxystra)"},
      {code:"0304839021",  title:"For processing"},
      {code:"0304839029",  title:"Other"},
      {code:"0304839090",  title:"Other"},
      {code:"0304840000",  title:"Swordfish (Xiphias gladius)"},
      {code:"0304850000",  title:"Toothfish (Dissostichus spp.)"},
      {code:"0304860000",  title:"Herrings (Clupea harengus, Clupea pallasii)"},
      {code:"0304870000",  title:"Tuna (of the genus Thunnus), skipjack or stripe-bellied bonito (Euthynnus (Katsuwonus) pelamis)"},
      {code:"0304870010",  title:"Atlantic bluefin tuna (Thunnus thynnus)"},
      {code:"0304870020",  title:"Bigeye tuna (Thunnus obesus)"},
      {code:"0304870090",  title:"Other"},
      {code:"0304880000",  title:"Dogfish, other sharks, rays and skates (Rajidae)"},
      {code:"0304881100",  title:"Dogfish and other sharks"},
      {code:"0304881100",  title:"Piked dogfish (Squalus acanthias) and catsharks (Scyliorhinus spp.)"},
      {code:"0304881500",  title:"Porbeagle shark (Lamna nasus)"},
      {code:"0304881800",  title:"Blue shark (Prionace glauca)"},
      {code:"0304881900",  title:"Other"},
      {code:"0304889000",  title:"Rays and skates (Rajidae)"},
      {code:"0304890000",  title:"Other"},
      {code:"0304891000",  title:"Freshwater fish"},
      {code:"0304892100",  title:"Other"},
      {code:"0304892100",  title:"Redfish (Sebastes spp.)"},
      {code:"0304892100",  title:"Of the species Sebastes marinus"},
      {code:"0304892900",  title:"Other"},
      {code:"0304892910",  title:"Of the species Sebastes mentella"},
      {code:"0304892990",  title:"Other"},
      {code:"0304893000",  title:"Fish of the genus Euthynnus, other than the skipjack or stripe-bellied bonito (Euthynnus (Katsuwonus) pelamis) mentioned in subheading 0304 87 00"},
      {code:"0304894100",  title:"Mackerel (Scomber scombrus, Scomber australasicus, Scomber japonicus) and fish of the species Orcynopsis unicolor"},
      {code:"0304894100",  title:"Mackerel of the species Scomber australasicus"},
      {code:"0304894900",  title:"Other"},
      {code:"0304894910",  title:"Mackerel of the species Scomber scombrus"},
      {code:"0304894920",  title:"Mackerel of the species Scomber japonicus"},
      {code:"0304894990",  title:"Fish of the species Orcynopsis unicolor"},
      {code:"0304896000",  title:"Monkfish (Lophius spp.)"},
      {code:"0304899000",  title:"Other"},
      {code:"0304899010",  title:"Of the species Allocyttus spp. and Pseudocyttus maculatus"},
      {code:"0304899020",  title:"Ray's bream (Brama spp.)"},
      {code:"0304899030",  title:"Sea bream (Dentex dentex, Pagellus spp.)"},
      {code:"0304899040",  title:"European sea bass (Dicentrarchus labrax)"},
      {code:"0304899050",  title:"Bogue (Boops boops)"},
      {code:"0304899060",  title:"Gilt-head sea bream (Sparus aurata)"},
      {code:"0304899090",  title:"Other"},
      {code:"0304910000",  title:"Other, frozen"},
      {code:"0304910000",  title:"Swordfish (Xiphias gladius)"},
      {code:"0304920000",  title:"Toothfish (Dissostichus spp.)"},
      {code:"0304930000",  title:"Tilapias (Oreochromis spp.), catfish (Pangasius spp., Silurus spp., Clarias spp., Ictalurus spp.), carp (Cyprinus spp., Carassius spp., Ctenopharyngodon idellus, Hypophthalmichthys spp., Cirrhinus spp., Mylopharyngodon piceus, Catla catla, Labeo spp., Osteochilus hasselti, Leptobarbus hoeveni, Megalobrama spp.), eels (Anguilla spp.), Nile perch (Lates niloticus) and snakeheads (Channa spp.)"},
      {code:"0304931000",  title:"Surimi"},
      {code:"0304931010",  title:"For processing"},
      {code:"0304931090",  title:"Other"},
      {code:"0304939000",  title:"Other"},
      {code:"0304939010",  title:"Carp (Cyprinus carpio, Carassius carassius, Ctenopharyngodon idellus, Hypophthalmichthys spp., Cirrhinus spp., Mylopharyngodon piceus)"},
      {code:"0304939090",  title:"Other"},
      {code:"0304940000",  title:"Alaska pollock (Theragra chalcogramma)"},
      {code:"0304941000",  title:"Surimi"},
      {code:"0304941010",  title:"For processing"},
      {code:"0304941090",  title:"Other"},
      {code:"0304949000",  title:"Other"},
      {code:"0304949010",  title:"For processing"},
      {code:"0304949090",  title:"Other"},
      {code:"0304950000",  title:"Fish of the families Bregmacerotidae, Euclichthyidae, Gadidae, Macrouridae, Melanonidae, Merlucciidae, Moridae and Muraenolepididae, other than Alaska pollock (Theragra chalcogramma)"},
      {code:"0304951000",  title:"Surimi"},
      {code:"0304951010",  title:"For processing"},
      {code:"0304951090",  title:"Other"},
      {code:"0304952100",  title:"Other"},
      {code:"0304952100",  title:"Cod (Gadus morhua, Gadus ogac, Gadus macrocephalus) and Polar cod (Boreogadus saida)"},
      {code:"0304952100",  title:"Cod of the species Gadus macrocephalus"},
      {code:"0304952110",  title:"For processing"},
      {code:"0304952190",  title:"Other"},
      {code:"0304952500",  title:"Cod of the species Gadus morhua"},
      {code:"0304952510",  title:"For processing"},
      {code:"0304952590",  title:"Other"},
      {code:"0304952900",  title:"Other"},
      {code:"0304953000",  title:"Haddock (Melanogrammus aeglefinus)"},
      {code:"0304954000",  title:"Coalfish (Pollachius virens)"},
      {code:"0304955000",  title:"Hake of the genus Merluccius"},
      {code:"0304955010",  title:"Hake (Merluccius productus) for processing"},
      {code:"0304955020",  title:"Argentine hake (Southwest Atlantic hake) (Merluccius hubbsi) for processing"},
      {code:"0304955090",  title:"Other"},
      {code:"0304956000",  title:"Blue whiting (Micromesistius poutassou)"},
      {code:"0304959000",  title:"Other"},
      {code:"0304959011",  title:"Fish of the genus Macruronus spp."},
      {code:"0304959011",  title:"Blue grenadier (Macruronus novaezelandiae)"},
      {code:"0304959011",  title:"For processing"},
      {code:"0304959013",  title:"Other"},
      {code:"0304959017",  title:"Other"},
      {code:"0304959017",  title:"For processing"},
      {code:"0304959019",  title:"Other"},
      {code:"0304959030",  title:"Hake of the genus Urophycis spp."},
      {code:"0304959090",  title:"Other"},
      {code:"0304960000",  title:"Dogfish and other sharks"},
      {code:"0304961000",  title:"Piked dogfish (Squalus acanthias) and catsharks (Scyliorhinus spp.)"},
      {code:"0304962000",  title:"Porbeagle shark (Lamna nasus)"},
      {code:"0304963000",  title:"Blue shark (Prionace glauca)"},
      {code:"0304969000",  title:"Other"},
      {code:"0304970000",  title:"Rays and skates (Rajidae)"},
      {code:"0304990000",  title:"Other"},
      {code:"0304991000",  title:"Surimi"},
      {code:"0304991010",  title:"For processing"},
      {code:"0304991090",  title:"Other"},
      {code:"0304992100",  title:"Other"},
      {code:"0304992100",  title:"Freshwater fish"},
      {code:"0304992111",  title:"Of trout (Salmo trutta, Oncorhynchus mykiss, Oncorhynchus clarki, Oncorhynchus aguabonita, Oncorhynchus gilae); of Pacific salmon (Oncorhynchus nerka, Oncorhynchus gorbuscha, Oncorhynchus keta, Oncorhynchus tschawytscha, Oncorhynchus kisutch, Oncorhynchus masou, Oncorhynchus rhodurus), Atlantic salmon (Salmo salar) and Danube salmon (Hucho hucho)"},
      {code:"0304992111",  title:"Of trout (Oncorhynchus mykiss)"},
      {code:"0304992112",  title:"Of trout (Salmo trutta, Oncorhynchus clarki, Oncorhynchus aguabonita and Oncorhynchus gilae)"},
      {code:"0304992113",  title:"Of Atlantic salmon (Salmo salar)"},
      {code:"0304992115",  title:"Of Pacific salmon (Oncorhynchus nerka, Oncorhynchus gorbuscha, Oncorhynchus keta, Oncorhynchus tschawytscha, Oncorhynchus kisutch, Oncorhynchus masou, Oncorhynchus rhodurus) and Danube salmon (Hucho hucho)"},
      {code:"0304992120",  title:"Of trout (Oncorhynchus apache and Oncorhynchus chrysogaster)"},
      {code:"0304992190",  title:"Other"},
      {code:"0304992300",  title:"Other"},
      {code:"0304992300",  title:"Herrings (Clupea harengus, Clupea pallasii)"},
      {code:"0304992310",  title:"Flaps, of a weight exceeding 80 g per piece, for industrial manufacture"},
      {code:"0304992320",  title:"Other flaps for industrial manufacture"},
      {code:"0304992330",  title:"Other flaps"},
      {code:"0304992390",  title:"Other"},
      {code:"0304992900",  title:"Redfish (Sebastes spp.)"},
      {code:"0304995500",  title:"Megrim (Lepidorhombus spp.)"},
      {code:"0304996100",  title:"Ray's bream (Brama spp.)"},
      {code:"0304996500",  title:"Monkfish (Lophius spp.)"},
      {code:"0304999900",  title:"Other"},
      {code:"0304999911",  title:"Of mackerel (Scomber scombrus, Scomber australasicus, Scomber japonicus)"},
      {code:"0304999911",  title:"Flaps"},
      {code:"0304999919",  title:"Other"},
      {code:"0304999920",  title:"Sea bream (Dentex dentex, Pagellus spp.)"},
      {code:"0304999925",  title:"Of gilt-head sea breams (Sparus aurata)"},
      {code:"0304999940",  title:"Of bluefin tunas (Thunnus thynnus)"},
      {code:"0304999950",  title:"Of Atlantic bigeye tuna (Thunnus obesus)"},
      {code:"0304999965",  title:"Of flatfish (Limanda aspera, Lepidopsetta bilineata, Pleuronectes<br>quadrituberculatus, Limanda ferruginea, Lepidopsetta polyxystra)"},
      {code:"0304999965",  title:"For processing"},
      {code:"0304999969",  title:"Other"},
      {code:"0304999970",  title:"European sea bass (Dicentrarchus labrax)"},
      {code:"0304999990",  title:"Other", full:""}      
    ];

  router.get('/beta/v8/conditional-questions-8270/commodity-details', function (req, res) {
    res.render('beta/v8/conditional-questions-8270/commodity-details', {
      options
    })
  })

  router.get('/beta/v8/conditional-questions-8270/commodity-details', function (req, res) {
    res.render('beta/v8/conditional-questions-8270/commodity-details', {
      options
    })
  })

  router.get('/beta/v8/conditional-questions-8270/commodity-details-codes', function (req, res) {
    res.render('beta/v8/conditional-questions-8270/commodity-details-codes', {
      options
    })
  })

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
