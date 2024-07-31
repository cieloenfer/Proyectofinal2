// routes/mocking.routes.js

const express = require('express');
const router = express.Router();
const { generateMockProducts } = require('../Controllers/mocking.controller');

/**
 * @swagger
 * tags:
 *   name: Mocking
 *   description: Endpoints for generating mock data
 */

/**
 * @swagger
 * /api/mockingproducts:
 *   get:
 *     summary: Generate and return mock products
 *     tags: [Mocking]
 *     responses:
 *       200:
 *         description: A list of mock products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "1"
 *                   title:
 *                     type: string
 *                     example: "Mock Product"
 *                   description:
 *                     type: string
 *                     example: "This is a description of the mock product."
 *                   code:
 *                     type: string
 *                     example: "123ABC"
 *                   price:
 *                     type: number
 *                     example: 19.99
 *                   status:
 *                     type: boolean
 *                     example: true
 *                   stock:
 *                     type: number
 *                     example: 100
 *                   category:
 *                     type: string
 *                     example: "Category"
 *                   thumbnails:
 *                     type: array
 *                     items:
 *                       type: string
 *                       example: "http://example.com/image.jpg"
 */
router.get('/mockingproducts', generateMockProducts);

module.exports = router;

