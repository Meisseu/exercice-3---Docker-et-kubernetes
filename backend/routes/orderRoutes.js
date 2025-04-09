const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/', orderController.createOrder);
router.get('/:id', orderController.getOrderById);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);

// Route spéciale pour commander directement pour un client existant
router.post('/direct/:customerId', orderController.createDirectOrder);

module.exports = router;
