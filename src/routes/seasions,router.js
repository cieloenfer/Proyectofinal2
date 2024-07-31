const express = require('express');
const passport = require('passport');
const sessionController = require('../controllers/session.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Sessions
 *   description: Session management
 */

/**
 * @swagger
 * /api/sessions/login:
 *   post:
 *     summary: User login
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: User email
 *               password:
 *                 type: string
 *                 description: User password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User logged in successfully
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post('/login', sessionController.login, authMiddleware.updateLastConnection);

/**
 * @swagger
 * /api/sessions/logout:
 *   post:
 *     summary: User logout
 *     tags: [Sessions]
 *     responses:
 *       200:
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User logged out successfully
 *       401:
 *         description: User not authenticated
 *       500:
 *         description: Server error
 */
router.post('/logout', authMiddleware.isAuthenticated, sessionController.logout, authMiddleware.updateLastConnection);

module.exports = router;

