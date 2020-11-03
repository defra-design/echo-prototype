module.exports = function(router) {
  // Load helper functions
  var tools = require('../tools.js')


  // ADD extra routing here if needed.
  // require('./extra-stories.js')(router)
  const fs = require('fs');

  // CHANGE VERSION TO THE VERSION
  const version = 'beta/v5'
  const base_url = version + "/EXUCD-11-save-and-continue"
  const file_url = version + "/core"

  router.post('/'+base_url+'*/certificate/save-and-continue-later', function(req, res) {
    console.log("working")
    if(req.body.save_and_continue =="yes"){
      res.redirect(301, '/' + base_url +req.params[0]+ '/dashboard?has_unfinished_certificate=yes');
    }else{
      res.redirect(301, '/' + base_url +req.params[0]+ "/"+req.query.save_return);
    }
  })
}
