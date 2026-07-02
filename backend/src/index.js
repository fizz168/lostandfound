require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const itemsRouter = require('./routes/items');
const claimsRouter = require('./routes/claims');
const activitiesRouter = require('./routes/activities');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/authRoutes');
const adminRouter = require('./routes/adminRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/items', itemsRouter);
app.use('/api/claims', claimsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();
