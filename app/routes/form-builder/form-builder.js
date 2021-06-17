module.exports = function (router) {
  // Load helper functions
  var tools = require('../tools.js')
  // To convert markdown
  var showdown = require('showdown')

  const classMap = {
    h1: 'govuk-heading-xl',
    h2: 'govuk-heading-l',
    h3: 'govuk-heading-m',
    h4: 'govuk-heading-s',
    ul: 'govuk-list govuk-list--bullet',
    ol: 'govuk-list govuk-list--number',
    a: 'govuk-link',
    p: 'govuk-body',
  }
  const bindings = Object.keys(classMap)
    .map(key => ({
      type: 'output',
      regex: new RegExp(`<${key}(.*)>`, 'g'),
      replace: `<${key} class="${classMap[key]}" $1>`
    }));
  const converter = new showdown.Converter({
    extensions: bindings
  })

  // ADD extra routing here if needed.
  // require('./extra-stories.js')(router)

  const fs = require('fs');

  // CHANGE VERSION each time you create a new version
  const version = 'v1-4'
  const base_url = "form-builder/"
  const file_url = "form-builder/" + version
  // var database = "ehc3987"
  // const certificate= "3987EHC"

  // Load any certificate within "app/data/certificates" folder
  const db = []
  var normalizedPath = require("path").join(__dirname, "../../data/certificates");
  fs.readdirSync(normalizedPath).forEach(function (file) {
    // require("./routes/" + file);
    var d = require("../../data/certificates/" + file);
    var n = file.substring(0, file.lastIndexOf("."));
    var f = {
      "id": n,
      "data": d
    }
    db.push(f)
  });

  // **** cloning ***
  router.post('/' + base_url + '*/manage/health-cert-editor--start-page-2', function (req, res) {
    req.session.data.start_page_content = converter.makeHtml(req.body.editor1);
    res.redirect(301, '/' + base_url + req.params[0] + '/manage/health-cert-editor--settings');

  })
  // MIDDLEWARE: Called every time a page is rendered
  router.use(function (req, res, next) {
    // this makes sure a certificate is loaded
    if (req.query.certificate && req.session.database != req.query.certificate) {
      req.session.database = req.query.certificate
      req.session.db = tools.getDB(req.query.certificate, db).data
    }
    // if the certificate is does not exist get one.
    req.session.db = req.session.db || tools.getDB(req.session.data.database, db).data
    req.session.data.is_multiple = req.session.db.is_multiple
    req.session.data.certificate_code = req.session.db.certificate_code
    next()
  })

  router.get('/form-builder/EXP-12730-audit/change-history', function (req, res) {
    console.log("The GET is running!");
    let results = [
      { version: "3.8", user: "Robert Frost", changeType: "New version", reason: "Change \"production date\" single date input to line of free text so applicant can enter a range of dates based on user feedback", status: "Unrestricted", dateImplemented: "21 Jul 2020", datePublished: "06 Aug 2020", url:"change-detail-version" },
      { version: "", user: "Liam Bancroft", changeType: "Config change", reason: "Change to white paper: COVID measures", status: "Withdrawn", dateImplemented: "11 May 2020", datePublished: "14 May 2020", url:"change-detail-config-full" },
      { version: "3.82", user: "Liam Bancroft", changeType: "New version", reason: "New function in system: Change to paper type", status: "", dateImplemented: "04 Feb 2020", datePublished: "03 Mar 2020", url:"change-detail-version" },
      { version: "3.81", user: "Robert Frost", changeType: "New version", reason: "Format of repeat question loop has changed. \"Save and review\" is no longer an option.", status: "Unrestricted", dateImplemented: "18 Dec 2020", datePublished: "19 Dec 2020", url:"change-detail-version" },
      { version: "0.1", user: "Liam Bancroft", changeType: "New version", reason: "Initial certificate creation", status: "On hold", dateImplemented: "14 Nov 2020", datePublished: "", url:"change-detail-version" },
      { version: "", user: "Liam Bancroft", changeType: "Status change", reason: "To restrict use in private Beta", status: "On hold", dateImplemented: "19 Dec 2020", datePublished: "19 Dec 2020", url:"change-detail-status" },
      { version: "1.0", user: "Liam Bancroft", changeType: "New version", reason: "Added a question for certifying department", status: "Restricted", dateImplemented: "11 Dec 2020", datePublished: "13 Dec 2020", url:"change-detail-version" },
    ];

    res.render('form-builder/EXP-12730-audit/change-history', {
      results
    })
  });


  router.get('/form-builder/EXP-12730-audit/reasons-for-change', function (req, res) {
    console.log('reasons-for-change?', req.query.type);
    let type = "version";
    if (req.query.type!==undefined){
      type = req.query.type.toLowerCase();
    }

    let response = "Why did you make these changes?";
    if(type === "status"){
      response = "Why did you make this status change?";
    }
    if(type === "config"){
      response = "Why did you make these config changes?";
    }
    if(type === "version"){
      response = "Why did you make this version change?";
    }
    res.render('form-builder/EXP-12730-audit/reasons-for-change', {
      title:response
    })
  });



  let messagesAudit = [
    { user: "Douglas Labella", message: "On Thursday 15 June, between 20:00 and 23:59, there will be planned unavailability for the EHC Online service. This service downtime is to deliver essential system maintenance work and critical updates, which continues to improve the user experience of the EHC Online system. ", alert: "Alert", audience: "Exporters", dateCreated: "11 Dec 2021", dateAmended: "17 Dec 2020", dateRemoved:"-", dateStart: "20 May 2021 at 8:00pm ", dateEnd: "27 May 2021 at 12:01am ", status:"Live", tag:"govuk-tag govuk-tag--red " },
    { user: "Teresa Randell", message: "On Thursday 15 June, between 20:00 and 23:59, there will be planned unavailability for the EHC Online service. This service downtime is to deliver essential system maintenance work and critical updates, which continues to improve the user experience of the EHC Online system. ", alert: "Information", audience: "Certifiers", dateCreated: "11 Dec 2020", dateAmended: "15 Dec 2020", dateRemoved:"17 Dec 2020", dateStart: "20 May 2021 at 8:00pm ", dateEnd: "27 May 2021 at 12:01am ", status:"Live", tag:"govuk-tag"  },
    { user: "Corl Fogleman", message: "On Thursday 15 June, between 20:00 and 23:59, there will be planned unavailability for the EHC Online service. This service downtime is to deliver essential system maintenance work and critical updates, which continues to improve the user experience of the EHC Online system. ", alert: "Information", audience: "Both ", dateCreated: "11 Dec 2020", dateAmended: "13 Dec 2020", dateRemoved:"17 Dec 2020" , dateStart: "", dateEnd: " ", status:"Expired", tag:"govuk-tag--red" },
    { user: "Nicholle Cranford", message: "You can now request a pre-certificate if you need an official copy of the certificate before APHA processes your application.", alert: "Alert", audience: "Exporters", dateCreated: "11 Dec 2020", dateAmended: "-", dateRemoved:"1 Jan 2021", dateStart: "04 Aug 2021 at 8:00pm ", dateEnd: " ", status:"Expired", tag:"govuk-tag--red"  },
    { user: "Lisa Kantar", message: "On Thursday 15 June, between 20:00 and 23:59, there will be planned unavailability for the EHC Online service. This service downtime is to deliver essential system maintenance work and critical updates, which continues to improve the user experience of the EHC Online system. ", alert: "Alert", audience: "Exporters", dateCreated: "11 Dec 2020", dateAmended: "-", dateRemoved:"1 Jan 2021", dateStart: "", dateEnd: "", status:"Expired", tag:"govuk-tag--red"  },
    { user: "Douglas Labella", message: "You can now request a pre-certificate if you need an official copy of the certificate before APHA processes your application.", alert: "Information", audience: "Exporters", dateCreated: "11 Dec 2020", dateAmended: "17 Dec 2020", dateRemoved:"4 Jan 2021", dateStart: "16 Jul 2021 at 8:00pm ", dateEnd: "17 Jul 2021 at 12:01am ", status:"Expired", tag:"govuk-tag--red"  },
    { user: "Teresa Randell", message: "On Thursday 15 June, between 20:00 and 23:59, there will be planned unavailability for the EHC Online service. This service downtime is to deliver essential system maintenance work and critical updates, which continues to improve the user experience of the EHC Online system. ", alert: "Information", audience: "Both", dateCreated: "11 Dec 2020", dateAmended: "15 Dec 2020", dateRemoved:"17 Dec 2020", dateStart: "12 Jun 2021 at 8:00pm ", dateEnd: "", status:"Draft", tag:"govuk-tag--grey" },
    { user: "Corl Fogleman", message: "You can now request a pre-certificate if you need an official copy of the certificate before APHA processes your application.", alert: "Information", audience: "Certifiers ", dateCreated: "11 Dec 2020", dateAmended: "13 Dec 2020", dateRemoved:"17 Dec 2020" , dateStart: "09 May 2021 at 8:00pm ", dateEnd: "", status:"Draft", tag:"govuk-tag--grey" },
    { user: "Nicholle Cranford", message: "You can now request a pre-certificate if you need an official copy of the certificate before APHA processes your application.", alert: "Alert", audience: "Exporters", dateCreated: "11 Dec 2020", dateAmended: "-", dateRemoved:"1 Apr 2020", dateStart: "", dateEnd: "", status:"Expired", tag:"govuk-tag--red"  },
    { user: "Lisa Kantar", message: "On Thursday 15 June, between 20:00 and 23:59, there will be planned unavailability for the EHC Online service. This service downtime is to deliver essential system maintenance work and critical updates, which continues to improve the user experience of the EHC Online system. ", alert: "Alert", audience: "Certifiers ", dateCreated: "11 Dec 2020", dateAmended: "-", dateRemoved:"1 Jan 2021", dateStart: "", dateEnd: "", status:"Expired", tag:"govuk-tag--red"  },       
    { user: "Lisa Kantar", message: "On Thursday 15 June, between 20:00 and 23:59, there will be planned unavailability for the EHC Online service. This service downtime is to deliver essential system maintenance work and critical updates, which continues to improve the user experience of the EHC Online system. ", alert: "Alert", audience: "Certifiers ", dateCreated: "11 Dec 2020", dateAmended: "-", dateRemoved:"-", dateStart: "", dateEnd: "", status:"Pending", tag:"govuk-tag--green"  },
    
    { user: "Lisa Kantar", message: "On Thursday 15 June, between 20:00 and 23:59, there will be planned unavailability for the EHC Online service. This service downtime is to deliver essential system maintenance work and critical updates, which continues to improve the user experience of the EHC Online system. ", alert: "Alert", audience: "Certifiers ", dateCreated: "11 Dec 2020", dateAmended: "15 Dec 2020", dateRemoved:"-", dateStart: "", dateEnd: "", status:"Draft", tag:"govuk-tag--grey"},   
    { user: "Lisa Kantar", message: "On Thursday 15 June, between 20:00 and 23:59, there will be planned unavailability for the EHC Online service. This service downtime is to deliver essential system maintenance work and critical updates, which continues to improve the user experience of the EHC Online system. ", alert: "Alert", audience: "Certifiers ", dateCreated: "11 Dec 2020", dateAmended: "12 Dec 2020", dateRemoved:"-", dateStart: "", dateEnd: "", status:"Draft", tag:"govuk-tag--grey"}, 
    { user: "Lisa Kantar", message: "On Thursday 15 June, between 20:00 and 23:59, there will be planned unavailability for the EHC Online service. This service downtime is to deliver essential system maintenance work and critical updates, which continues to improve the user experience of the EHC Online system. ", alert: "Alert", audience: "Certifiers ", dateCreated: "11 Dec 2020", dateAmended: "11 Dec 2020", dateRemoved:"-", dateStart: "", dateEnd: "", status:"Draft", tag:"govuk-tag--grey"},
    { user: "Lisa Kantar", message: "On Thursday 15 June, between 20:00 and 23:59, there will be planned unavailability for the EHC Online service. This service downtime is to deliver essential system maintenance work and critical updates, which continues to improve the user experience of the EHC Online system. ", alert: "Alert", audience: "Certifiers ", dateCreated: "11 Dec 2020", dateAmended: "-", dateRemoved:"-", dateStart: "", dateEnd: "", status:"Draft", tag:"govuk-tag--grey"},
  ];
  
  
  router.get('/form-builder/notifications/audit', function (req, res) {
    console.log('audit?');
    let results = messagesAudit.slice(0,10);
    res.render('form-builder/notifications/audit', {
      results
    })
  });  
  
  router.get('/form-builder/notifications/audit-filter', function (req, res) {
    console.log('audit?');
    res.render('form-builder/notifications/audit-filter', {
      results:messagesAudit
    })
  });  


  // this adds query to all pages and will be called if no other get routing exists.
  router.get('/' + base_url + '*', function (req, res) {
    console.log("default get routing page for form-builder: " + base_url + req.params[0])
    var dir = req.params[0].split(/\/+/g);
    // Remove the main folder
    dir.shift()
    var baseDir = ""
    dir.forEach(function (element) {
      var path = "/" + element
      baseDir += path

    })
    res.render(base_url + req.params[0], {
      "query": req.query,
      "db": req.session.db
    }, function (err, html) {
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
