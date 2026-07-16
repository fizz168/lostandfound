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
const Role = require('./models/Role');
const cloudinary = require('cloudinary').v2;

const upload = require('./middleware/upload')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

// Upload endpoint
app.post('/api/upload', upload.single('image'), async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' })
  }

  const dataUri = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`

  try {
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: 'lostandfound',
      resource_type: 'image',
    })

    res.json({ url: result.secure_url })
  } catch (err) {
    next(err)
  }
})

// Error handler
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }

  if (err && err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Max 5MB.' })
    }
    return res.status(400).json({ error: 'Upload failed.' })
  }

  if (err && err.message === 'Only images are allowed') {
    return res.status(400).json({ error: 'Only image files are allowed.' })
  }

  const status = err.statusCode || err.status || 500
  const message = err.message || 'Internal server error'
  console.error('Upload error:', err)
  res.status(status).json({ error: message })
})

start();
