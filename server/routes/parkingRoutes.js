const express = require('express');
const router = express.Router();

// Controllers to handle parking records
const parkingController = require('../controllers/parkingController');
// Controller for parking history
const { getParkingHistoryController } = require('../controllers/parkingController');

// POST / - create a new parking record
router.post('/', parkingController.addParkingRecord);

// GET /active - retrieve active parking records
router.get('/active', parkingController.getActiveParking);

// GET /history - retrieve parking history
router.get('/history', getParkingHistoryController);

// PUT /:id/checkout - checkout a parking record
router.put('/:id/checkout', parkingController.checkoutParking);

// PUT /:id/ - update a parking record
router.put('/:id', parkingController.updateParkingRecord);

module.exports = router;
