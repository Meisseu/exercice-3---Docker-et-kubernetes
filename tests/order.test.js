const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Order API Tests', () => {
    let customerId, productId, orderId;

    beforeAll(async () => {
        // Créer un client
        const customerRes = await request(app).post('/api/customers').send({
            name: 'Order Customer',
            email: 'order@example.com'
        });
        customerId = customerRes.body._id;

        // Créer un produit
        const productRes = await request(app).post('/api/products').send({
            name: 'Order Product',
            price: 50,
            stock: 20
        });
        productId = productRes.body._id;
    });

    test('POST /api/orders - Should create an order', async () => {
        const res = await request(app).post('/api/orders').send({
            customer: customerId,
            products: [productId]
        });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('_id');
        orderId = res.body._id;
    });

    test('GET /api/orders/:id - Should retrieve order details', async () => {
        const res = await request(app).get(`/api/orders/${orderId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('_id', orderId);
    });

    test('PUT /api/orders/:id - Should update an order', async () => {
        const res = await request(app).put(`/api/orders/${orderId}`).send({
            products: [productId]
        });

        expect(res.statusCode).toBe(200);
    });

    test('DELETE /api/orders/:id - Should delete an order', async () => {
        const res = await request(app).delete(`/api/orders/${orderId}`);
        expect(res.statusCode).toBe(200);
    });
});
