module.exports = function(router) {
  // Load helper functions
  var tools = require('../tools.js')
  // To convert markdown
  var showdown  = require('showdown')

  //require('./EXP-12730-audit.js')(router);


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
  const version = 'v1-1'
  const base_url =  "form-builder/"
  const file_url = "form-builder/"+version
  // var database = "ehc3987"
  // const certificate= "3987EHC"

  // Load any certificate within "app/data/certificates" folder
  const db = []
  var normalizedPath = require("path").join(__dirname, "../../data/certificates");
  fs.readdirSync(normalizedPath).forEach(function(file) {
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
  router.post('/'+base_url+'*/manage/health-cert-editor--start-page-2', function(req, res) {
    req.session.data.start_page_content=converter.makeHtml(req.body.editor1);
    res.redirect(301, '/' + base_url +req.params[0]+'/manage/health-cert-editor--settings');

  })
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
    next()
  })

  router.get('/form-builder/EXP-12730-audit/change-history', function (req, res) {
    console.log("The GET is running!");
   let results = [
     {version:"3.83", user:"Robert", changeType:"New version", reason:"Change \"production date\" single date input to line of free text so applicant can enter a range of dates based on user feedback", status:"Unrestricted", dateChanged:"21/07/2020", datePublished:"06/08/2020"},
     {version:"3.82", user:"Liam", changeType:"Config change", reason:"Change to white paper: COVID measures", status:"Withdrawn", dateChanged:"11/05/2020", datePublished:"14/05/2020"},
     {version:"3.82", user:"Liam", changeType:"New version", reason:"New function in system: Change to paper type", status:"", dateChanged:"04/02/2020", datePublished:"03/03/2020"},
     {version:"3.81", user:"Robert", changeType:"New version", reason:"Format of repeat question loop has changed. \"Save and review\" is no longer an option.", status:"Unrestricted", dateChanged:"18/12/2019", datePublished:"19/12/2019"},
     {version:"3.7", user:"Liam", changeType:"New form", reason:"Initial certificate creation", status:"On hold", dateChanged:"14/11/2019", datePublished:""},
     {version:"1.1", user:"Liam", changeType: "Status change", reason:"To restrict use in private Beta", status:"Restricted", dateChanged:"19/12/2019", datePublished:"19/12/2019"},
     {version:"1.0", user:"Liam", changeType: "New version", reason:"Added a question for certifying department", status:"Restricted", dateChanged:"11/12/2019", datePublished:"13/12/2019"},
    ];

    res.render('form-builder/EXP-12730-audit/change-history', {
      results
    })
  });

  // this adds query to all pages and will be called if no other get routing exists.
  router.get('/' + base_url + '*', function(req, res) {
    console.log("default get routing page forfb: " + base_url + req.params[0])
    var dir = req.params[0].split(/\/+/g);
    // Remove the main folder
    dir.shift()
    var baseDir = ""
    dir.forEach(function(element) {
      var path = "/" + element
      baseDir += path

    })
    res.render(base_url + req.params[0], {
      "query": req.query,
      "db": req.session.db
    }, function(err, html) {
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
