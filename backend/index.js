const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const usersRouter = require('./routes/users');
const vehiclesRouter = require('./routes/vehicles');
const collectionsRouter = require('./routes/collections');
const reportsRouter = require('./routes/reports');
const routesRouter = require('./routes/routes');
const notificationsRouter = require('./routes/notifications');
const pickupRequestsRouter = require('./routes/pickup-requests');
const { router: authRouter, authMiddleware } = require('./routes/auth');
const binsRouter = require('./routes/bins');
const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB Atlas
connectDB();

// CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:3000',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:5174',
      'http://127.0.0.1:3000'
    ];

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend server is running with MongoDB Atlas!');
});

// Users API
app.use('/api/users', authMiddleware, usersRouter);
// Vehicles API
app.use('/api/vehicles', authMiddleware, vehiclesRouter);
// Collections API
app.use('/api/collections', authMiddleware, collectionsRouter);
// Reports API
app.use('/api/reports', authMiddleware, reportsRouter);
// Routes API
app.use('/api/routes', authMiddleware, routesRouter);
// Notifications API
app.use('/api/notifications', authMiddleware, notificationsRouter);
// Pickup Requests API
app.use('/api/pickup-requests', authMiddleware, pickupRequestsRouter);
// Auth API
app.use('/api/auth', authRouter);
// Bins API
app.use('/api/bins', authMiddleware, binsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Using MongoDB Atlas for data storage`);
});

require('dotenv').config();
