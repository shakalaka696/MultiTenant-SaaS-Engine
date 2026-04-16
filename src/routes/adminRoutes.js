const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const segmentController = require('../controllers/segmentController');
const { verifyToken } = require('../middleware/authMiddleware');


router.use(verifyToken);

// Admin Customer Management

router.get('/customers', customerController.listCustomers);
router.get('/customers/:id', customerController.getCustomerById);
router.delete('/customers/:id', customerController.deleteCustomer);

// Segment Management

router.post('/segments', segmentController.createSegment);           // S1
router.get('/segments', segmentController.listSegments);             // S2
router.get('/segments/:id', segmentController.getSegmentById);       // S3
router.put('/segments/:id', segmentController.updateSegment);        // S4
router.delete('/segments/:id', segmentController.deleteSegment);     // S5
router.post('/segments/:id/customers', segmentController.addCustomerToSegment); // S6
router.delete('/segments/:id/customers/:customerId', segmentController.removeCustomerFromSegment); // S7

module.exports = router;