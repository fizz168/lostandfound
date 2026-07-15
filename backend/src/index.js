const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const sequelize = require('./db');
const itemsRouter = require('./routes/items');
const claimsRouter = require('./routes/claims');
const activitiesRouter = require('./routes/activities');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/authRoutes');
const adminRouter = require('./routes/adminRoutes');
const Role = require('./models/Role');

const upload = require('./middleware/upload')


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
    const uploadsDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    
    await sequelize.authenticate();
    await sequelize.sync();
    await Promise.all([
      Role.findOrCreate({ where: { name: 'user' } }),
      Role.findOrCreate({ where: { name: 'admin' } }),
    ])
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}


// Serve uploaded images as static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// Upload endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' })
  }
  const imageUrl = `/uploads/${req.file.filename}`
  res.json({ url: imageUrl })
})

// Multer error handler
app.use((err, req, res, next) => {
  if (err && err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Max 5MB.' })
    }
    return res.status(400).json({ error: 'Upload failed.' })
  }
  if (err && err.message === 'Only images are allowed') {
    return res.status(400).json({ error: 'Only image files are allowed.' })
  }
  next(err)
})

start();
