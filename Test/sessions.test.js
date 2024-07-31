// test/sessions.test.js
const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app'); // Asegúrate de que esta ruta es correcta

describe('Sessions API', () => {
  it('Debería registrar un nuevo usuario', async () => {
    const newUser = {
      email: 'nuevo@usuario.com',
      password: '123456'
    };
    const res = await request(app)
      .post('/api/sessions/register')
      .send(newUser);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('message', 'Usuario registrado exitosamente');
  });

  it('Debería iniciar sesión un usuario', async () => {
    const user = {
      email: 'usuario@registrado.com',
      password: '123456'
    };
    const res = await request(app)
      .post('/api/sessions/login')
      .send(user);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
  });

  it('Debería cerrar sesión un usuario', async () => {
    const res = await request(app).post('/api/sessions/logout');
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('message', 'Sesión cerrada exitosamente');
  });
});
