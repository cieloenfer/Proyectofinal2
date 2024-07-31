const express = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   role:
 *                     type: string
 */
router.get('/', authMiddleware.isAdmin, userController.getAllUsers);

/**
 * @swagger
 * /api/users:
 *   delete:
 *     summary: Delete inactive users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Inactive users deleted
 *       500:
 *         description: Server error
 */
router.delete('/', authMiddleware.isAdmin, userController.deleteInactiveUsers);

/**
 * @swagger
 * /api/users/{uid}/role:
 *   put:
 *     summary: Update user role
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 description: New user role
 *     responses:
 *       200:
 *         description: User role updated
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.put('/:uid/role', authMiddleware.isAdmin, userController.updateUserRole);

module.exports = router;
