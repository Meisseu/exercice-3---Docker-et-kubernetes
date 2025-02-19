const Order = require('../models/orderModel');
const Customer = require('../models/customerModel');
const Product = require('../models/productModel');

exports.createOrder = async (req, res) => {
    try {
        const { customer, products } = req.body;
        const existingCustomer = await Customer.findById(customer);

        if (!existingCustomer) {
            return res.status(404).json({ error: "Customer not found" });
        }

        const order = new Order({ customer, products });
        await order.save();

        res.status(201).json(order);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('customer products');
        if (!order) return res.status(404).json({ error: "Order not found" });
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(order);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.json({ message: "Order deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Route spéciale pour commander directement pour un client
exports.createDirectOrder = async (req, res) => {
    try {
        const { customerId } = req.params;
        const { products } = req.body;

        const customer = await Customer.findById(customerId);
        if (!customer) {
            return res.status(404).json({ error: "Customer not found" });
        }

        const order = new Order({ customer: customerId, products });
        await order.save();

        res.status(201).json({ message: "Order created successfully", order });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
