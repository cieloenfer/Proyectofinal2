// test/carts.test.js
const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app'); // Asegúrate de que esta ruta es correcta

describe('Carts API', () => {
  it('Debería crear un nuevo carrito', async () => {
    const res = await request(app).post('/api/carts');
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('id');
    expect(res.body.products).to.be.an('array');
  });

  it('Debería obtener los productos de un carrito por ID', async () => {
    const cartId = 'ID_DEL_CARRITO';
    const res = await request(app).get(`/api/carts/${cartId}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('Debería agregar un producto a un carrito', async () => {
    const cartId = 'ID_DEL_CARRITO';
    const productId = 'ID_DEL_PRODUCTO';
    const res = await request(app).post(`/api/carts/${cartId}/product/${productId}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });
});
