// test/products.test.js
const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app'); // Asegúrate de que esta ruta es correcta

describe('Products API', () => {
  it('Debería obtener todos los productos', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('Debería obtener un producto por ID', async () => {
    const productId = 'ID_DEL_PRODUCTO';
    const res = await request(app).get(`/api/products/${productId}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('id', productId);
  });

  it('Debería agregar un nuevo producto', async () => {
    const newProduct = {
      title: 'Nuevo Producto',
      description: 'Descripción del nuevo producto',
      code: 'ABC123',
      price: 100,
      status: true,
      stock: 10,
      category: 'Categoría',
      thumbnails: []
    };
    const res = await request(app)
      .post('/api/products')
      .send(newProduct);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('id');
    expect(res.body.title).to.equal(newProduct.title);
  });
});
