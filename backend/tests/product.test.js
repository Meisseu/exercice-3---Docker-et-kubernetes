const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Product API Tests', () => {
    let productId;

    test('POST /api/products - Should create a product', async () => {
        const res = await request(app).post('/api/products').send({
            name: 'Test Product',
            price: 100,
            stock: 10
        });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('_id');
        productId = res.body._id;
    });

    test('GET /api/products - Should retrieve all products', async () => {
        const res = await request(app).get('/api/products');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    test('GET /api/products/:id - Should retrieve a single product', async () => {
        const res = await request(app).get(`/api/products/${productId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('_id', productId);
    });

    test('PUT /api/products/:id - Should update a product', async () => {
        const res = await request(app).put(`/api/products/${productId}`).send({
            name: 'Updated Product',
            price: 150
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe('Updated Product');
    });

    test('DELETE /api/products/:id - Should delete a product', async () => {
        const res = await request(app).delete(`/api/products/${productId}`);
        expect(res.statusCode).toBe(200);
    });
});
