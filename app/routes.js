const express = require('express')
const router = express.Router()

//please update this version each time you version the prototype.
const current_version = "/beta/v8/core/"

// IDM re-route back to a page I moved.
router.get('/e2e/confirmation', function(req, res) {
  return res.redirect(301, '/alpha/e2e/confirmation');
})
//set up a redirect for any link containing "latest" correspoding page in "current_version".
router.get('/latest/*', function(req, res) {
  // req.params[0] = what ever is typed after /latest/ represented by the *

  return res.redirect(301, current_version+req.params[0]);
})


require('./routes/alpha/e2e/routes.js')(router);

//form builder Admin
require('./routes/form-builder/form-builder.js')(router);

// Add your routes here - above the module.exports line
require('./routes/alpha/ehc-7006-ab-version4/routes.js')(router);
require('./routes/alpha/ehc-7006-ab-version4-1/routes.js')(router);
require('./routes/alpha/ehc-7006-ab-version4-2/routes.js')(router);
require('./routes/alpha/ehc-7006-ab-version4-3/routes.js')(router);
require('./routes/alpha/ehc-8270-version2/routes.js')(router);

// beta
require('./routes/v1/routes.js')(router);
require('./routes/v2/routes.js')(router);
require('./routes/v3/routes.js')(router);
require('./routes/v4/routes.js')(router);
require('./routes/v5/routes.js')(router);
require('./routes/v6/routes.js')(router);
require('./routes/v7/routes.js')(router);
require('./routes/v8/routes.js')(router);
module.exports = router
