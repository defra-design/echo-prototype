module.exports = function(router) {
  // Load helper functions
  var tools = require('../tools.js')
  const cheerio = require('cheerio')
  const $ = cheerio.load('https://www.gov.uk/export-health-certificates/export-dairy-and-dairy-products-to-australia-certificate-6969')
  // ADD extra routing here if needed.
  // require('./extra-stories.js')(router)
  const fs = require('fs');
  const radioButtonRedirect = require('radio-button-redirect')
  router.use(radioButtonRedirect)

  // CHANGE VERSION TO THE VERSION
  const version = 'beta/v8'
  const base_url = version + "/"
  const file_url = version + "/core"
  const db = []


  const rp = require('request-promise');

  var normalizedPath = require("path").join(__dirname, "../../data/certificates");
  fs.readdirSync(normalizedPath).forEach(function(file) {
    // require("./routes/" + file);
    var d = require("../../data/certificates/" + file);
    var n = file.substring(0, file.lastIndexOf("."));
    var f = {"id":n,"data":d}
    db.push(f)
  });
  // Load any certificate within "app/data/certificates" folder




  router.get('/'+base_url+'*/start/form-finder', function(req, res) {
    console.log("woooooooookring!")
    var forms = require('../../data/forms.json')
    res.render(base_url+req.params[0]+'/start/form-finder', {
      "query": req.query,
      "forms":forms
    }, function(err, html) {
      if (err) {
        if (err.message.indexOf('template not found') !== -1) {
          return res.render(file_url + '/start/form-finder', {"query": req.query,
          "forms":forms});
        }
        throw err;
      }
      res.send(html);
    })
  })


  router.get('/'+base_url+'*/start/form-test', function(req, res) {
    var url = req.query.cert_link

    rp(url)
      .then(function(page){
        //success!
        newHTML = cheerio.load(page)
        var next = (req.session.data.logged_in=="yes")? 'certificate/check-your-progress?certificate=ehc'+req.query.cert_code : "./gov-sign-in?certificate=ehc"+req.query.cert_code
        newHTML('.gem-c-button').attr('href',next)
        res.render(base_url+req.params[0]+'start/form-test', {
          "query": req.query,
          "page":newHTML.html()
        }, function(err, html) {
          if (err) {
            if (err.message.indexOf('template not found') !== -1) {
              return res.render(file_url + '/start/form-test', {"query": req.query,
              "page":newHTML.html()});
            }
            throw err;
          }
          res.send(html);
        })
      })
      .catch(function(err){
        //handle error
      });

  })



}
