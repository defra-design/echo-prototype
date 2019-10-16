const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line
require('./routes/ehc-7006-ab-version4/routes.js')(router);
require('./routes/ehc-7006-ab-version4-1/routes.js')(router);
require('./routes/ehc-7006-ab-version4-3/routes.js')(router);
module.exports = router
