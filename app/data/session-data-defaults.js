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
var cases_list = require('./applications.json')

module.exports = {
    "empty":[],
    "skipped"   :  ["empty"],
    "uploaded_files": [],
    "file_id_count" : 0,
    "completed" :   [],
    "products"   :  [],
    "certificate" : "8327EHC",
    "database": "ehc8327",
    // "forms" : form,
    "printable": "yes",
    "originals": {},
    "added_certificates" : [],
    "mulitiple_max" : 50,
    "filter_status": "",
    "applications": cases_list,
    "editor1": '<p class="govuk-body">You can add certificates for up to {{data.mulitiple_max}} horses to this application if all the horses:</p>\r\n\r\n<ul class="govuk-list govuk-list--bullet">\r\n\t<li>will be certified by the same official vet</li>\r\n\t<li>will be examined on the same day at the same place</li>\r\n\t<li>are leaving on the same day</li>\r\n\t<li>are going from the same consignor</li>\r\n\t<li>are going to the same consignee</li>\r\n\t<li>are going to the same final destination</li>\r\n</ul>\r\n\r\n<p>If all the horses are not coming from and going to the same place, you will need to make separate applications.</p>\r\n\r\n<h2 class="govuk-heading-m">Before you start</h2>\r\n\r\n<p>You should read <a href=\"https://assets.publishing.service.gov.uk/media/5bc45a53ed915d0ad7db6c87/2849NFG.doc\">Defra&#39;s guidance for exporters and certifiers</a>.</p>\r\n\r\n<p>Your answers will go into an export health certificate. <a href=\"https://assets.publishing.service.gov.uk/media/5bc45a36ed915d0ae0044a25/2849EHC_V1.pdf\">View a sample certificate[PDF]</a>.</p>\r\n'
}
