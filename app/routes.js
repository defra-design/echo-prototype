const express = require('express')
const router = express.Router()

require('./routes/experimental/e2e/routes.js')(router);

//form builder Admin
require('./routes/form-builder/form-builder.js')(router);

// Add your routes here - above the module.exports line
require('./routes/experimental/ehc-7006-ab-version4/routes.js')(router);
require('./routes/experimental/ehc-7006-ab-version4-1/routes.js')(router);
require('./routes/experimental/ehc-7006-ab-version4-2/routes.js')(router);
require('./routes/experimental/ehc-7006-ab-version4-3/routes.js')(router);
require('./routes/experimental/ehc-8270-version2/routes.js')(router);

// beta
require('./routes/v1/routes.js')(router);
require('./routes/v2/routes.js')(router);
require('./routes/v3/routes.js')(router);
require('./routes/v4/routes.js')(router);
module.exports = router
