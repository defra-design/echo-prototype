const express = require('express')
const router = express.Router()

// Version 1.0 routing
require('./routes/1-0-0/dashboard.js')(router);
require('./routes/1-0-0/ehcUpload.js')(router);
require('./routes/1-0-0/manualUpload.js')(router);
require('./routes/1-0-0/exa.js')(router);
require('./routes/1-0-0/checkAndSubmit.js')(router);
	
router.get('/', function (req, res) {
  res.render('home');
});

module.exports = router;