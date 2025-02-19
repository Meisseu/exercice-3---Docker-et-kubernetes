const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Customer API Tests', () => {
    let customerId;

    test('POST /api/customers - Should create a customer', async () => {
        const res = await request(app).post('/api/customers').send({
            name: 'John Doe',
            email: 'john@example.com'
        });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('_id');
        customerId = res.body._id;
    });

    test('GET /api/customers - Should retrieve all customers', async () => {
        const res = await request(app).get('/api/customers');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    test('GET /api/customers/:id - Should retrieve a single customer', async () => {
        const res = await request(app).get(`/api/customers/${customerId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('_id', customerId);
    });
});
