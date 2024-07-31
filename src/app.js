const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');
const cartRoutes = require('./routes/cart.routes');
const sessionRoutes = require('./routes/session.routes');
const authRoutes = require('./routes/auth.routes');
const config = require('./config/config');
const logger = require('./config/logger');

const app = express();
app.set('view engine', 'ejs');
const PORT =process.env.PORT|| 8080;
const conection =mongoose.connect(process.env.MONGO_URL)

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

mongoose.connect(config.mongodb.uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => logger.info('Connected to MongoDB'))
  .catch(err => logger.error('Failed to connect to MongoDB', err));

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/auth', authRoutes);

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
}

module.exports = app;
