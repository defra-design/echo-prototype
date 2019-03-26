const express = require('express')
const router = express.Router()

// Version 1.0-0 routing
require('./routes/1-0-0/dashboard.js')(router);
require('./routes/1-0-0/ehcUpload.js')(router);
require('./routes/1-0-0/manualUpload.js')(router);
require('./routes/1-0-0/exa.js')(router);
require('./routes/1-0-0/checkAndSubmit.js')(router);

// Version 1.0-1 routing
require('./routes/1-0-1/dashboard.js')(router);
require('./routes/1-0-1/ehcUpload.js')(router);
require('./routes/1-0-1/manualUpload.js')(router);
require('./routes/1-0-1/exa.js')(router);
require('./routes/1-0-1/checkAndSubmit.js')(router);

// Version 2849 routing
require('./routes/2849/dashboard.js')(router);
require('./routes/2849/ehcUpload.js')(router);
require('./routes/2849/manualUpload.js')(router);
require('./routes/2849/supportingDocumentsUpload.js')(router);
require('./routes/2849/exa.js')(router);
require('./routes/2849/checkAndSubmit.js')(router);

router.get('/', function (req, res) {
  res.render('home');
});

module.exports = router;