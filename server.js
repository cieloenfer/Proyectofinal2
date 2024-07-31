const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const connectFlash = require('connect-flash');
const path = require('path');
const MongoStore = require('connect-mongo');
const dotenv = require('dotenv');
const morgan = require('morgan');
const authRoutes = require('./src/routes/auth.routes');
const cartRoutes = require('./src/routes/cart.route');
const productRoutes = require('./src/routes/product.route');
const userRoutes = require('./src/routes/user.routes');
const config = require('./src/config/config');
const passport = require('./config/passport')(passport);

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: config.jwtSecret, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(connectFlash());

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/auth', authRoutes);
app.use('/cart', cartRoutes);
app.use('/product', productRoutes);
app.use('/user', userRoutes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    res.status(404).send('Page not found');
});

// Error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send('Server error');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/your_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
