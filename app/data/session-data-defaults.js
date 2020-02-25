/*

Provide default values for user session data. These are automatically added
via the `autoStoreData` middleware. Values will only be added to the
session if a value doesn't already exist. This may be useful for testing
journeys where users are returning or logging in to an existing application.

============================================================================

Example usage:

"full-name": "Sarah Philips",

"options-chosen": [ "foo", "bar" ]

============================================================================

*/

var ehc8270 = require('./ehc-8270.json')
var ehc8327 = require('./ehc8327.json')
var form = require('./forms.json')
module.exports = {
    "empty":[],
    "skipped"   :  ["empty"],
    "uploaded_files": [],
    "file_id_count" : 0,
    "completed" :   [],
    "ehc8270"   :  ehc8270,
    "ehc8327"   :  ehc8327,
    "products"   :  [],
    "certificate" : "8327EHC",
    "database": "ehc8327",
    "forms" : form,
    "printable": "yes",
    "originals": {},
    "added_certificates" : [],
    "mulitiple_max" : 50
}
