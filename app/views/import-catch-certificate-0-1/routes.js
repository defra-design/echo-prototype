const express = require('express')
const router = express.Router()
const countries = require('i18n-iso-countries');

// Add your routes here - above the module.exports line

// redirect route to start page
router.get('/', (req, res, next) => {
	res.redirect(`/${req.version}/your-applications`)
})

// set the service name on all pages in this version
router.all('*', function (req, res, next) {
	res.locals['serviceName'] = 'Export health certificates'

	next()
})





router.get('/task-list', (req, res, next) => {
	delete req.session.data['filter']
	
	res.render(`${req.version}/task-list`)
})

router.post('/certificate-number', (req, res, next) => {
	if(req.session.data['import-certificate'] == 'yes'){
		res.redirect('certificate-details')
	} else {
		res.redirect('exports-application--empty')
	}
})

router.post('/certificate-details', (req, res, next) => {
	res.redirect('exports-application--partial')
})

router.post('/your-applications', (req, res, next) => {
	res.redirect('choose-certificate')
})

router.post('/choose-certificate', (req, res, next) => {
	res.redirect('block')
})

router.post('/clone', (req, res, next) => {
	res.redirect('reuse-reference')
})

router.post('/reuse-reference', (req, res, next) => {
	res.redirect('review-your-answers')
})

router.post('/block', (req, res, next) => {
	res.redirect('certificate-number')
})

router.post('/what-are-you-exporting', (req, res, next) => {
	res.redirect('reference')
})

router.post('/reference', (req, res, next) => {
	res.redirect('destination')
})

router.post('/destination', (req, res, next) => {
	res.redirect('about-your-certifier')
})


module.exports = router