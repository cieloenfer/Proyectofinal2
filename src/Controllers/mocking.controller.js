const faker = require('faker');
const Cart = require('../Dao/Models/cartModel');
const Product = require('../Dao/Models/productModel');

function generateMockProducts(req, res) {
    const products = [];
    for (let i = 0; i < 100; i++) {
        products.push({
            _id: faker.datatype.uuid(),
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price(),
            category: faker.commerce.department(),
            stock: faker.datatype.number({ min: 0, max: 100 }),
            image: faker.image.imageUrl(),
        });
    }
    res.json(products);
}

module.exports = {
    generateMockProducts,
};
