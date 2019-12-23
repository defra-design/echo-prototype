const express = require('express')
const router = express.Router()
require('./routes/e2e/routes.js')(router);
// Add your routes here - above the module.exports line
require('./routes/ehc-7006-ab-version4/routes.js')(router);
require('./routes/ehc-7006-ab-version4-1/routes.js')(router);
require('./routes/ehc-7006-ab-version4-2/routes.js')(router);
require('./routes/ehc-7006-ab-version4-3/routes.js')(router);
require('./routes/ehc-8270-version2/routes.js')(router);
require('./routes/ehc-8327/routes.js')(router);

// beta
require('./routes/v1/routes.js')(router);
require('./routes/v2/routes.js')(router);
require('./routes/v3/routes.js')(router);
module.exports = router
