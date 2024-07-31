const express = require('express');
const router = express.Router();
const logger = require('../config/logger');

/**
 * @swagger
 * tags:
 *   name: Logger
 *   description: Testing logger levels
 */

/**
 * @swagger
 * /api/loggerTest:
 *   get:
 *     summary: Test all logger levels
 *     tags: [Logger]
 *     responses:
 *       200:
 *         description: Logging test complete
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Logging test complete
 */
router.get('/loggerTest', (req, res) => {
    logger.debug('This is a debug log');
    logger.http('This is an http log');
    logger.info('This is an info log');
    logger.warning('This is a warning log');
    logger.error('This is an error log');
    logger.fatal('This is a fatal log');
    res.send('Logging test complete');
});

module.exports = router;

