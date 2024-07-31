const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');

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
 *         description: Logger test completed
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Logger test completed. Check your logs.
 */
router.get('/loggerTest', (req, res) => {
  logger.debug('Debug log');
  logger.http('HTTP log');
  logger.info('Info log');
  logger.warn('Warning log');
  logger.error('Error log');
  logger.fatal('Fatal log');
  res.send('Logger test completed. Check your logs.');
});

module.exports = router;

