const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');
const authMiddleware = require('../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Carts
 *   description: Cart management
 */

/**
 * @swagger
 * /api/carts:
 *   post:
 *     summary: Create a new cart
 *     tags: [Carts]
 *     responses:
 *       201:
 *         description: The cart was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       500:
 *         description: Some server error
 */
router.post('/', authMiddleware.isAuthenticated, cartController.createCart);

/**
 * @swagger
 * /api/carts/{cid}:
 *   get:
 *     summary: Get cart by ID
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: cid
 *         schema:
 *           type: string
 *         required: true
 *         description: The cart ID
 *     responses:
 *       200:
 *         description: The cart products by ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: Cart not found
 */
router.get('/:cid', authMiddleware.isAuthenticated, cartController.getCartById);

/**
 * @swagger
 * /api/carts/{cid}/product/{pid}:
 *   post:
 *     summary: Add product to cart
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: cid
 *         schema:
 *           type: string
 *         required: true
 *         description: The cart ID
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: The product was successfully added to the cart
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Some server error
 */
router.post('/:cid/product/:pid', authMiddleware.isAuthenticated, cartController.addProductToCart);

module.exports = router;
