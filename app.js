const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const app = express();
const contactsRouter = require('./routes/api/contacts');
const usersRouter = require('./routes/api/users');
const authRouter = require('./routes/api/auth');
require('dotenv').config()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Seerver error" } = err;
  res.status(status).json({ message: err.message })
})

module.exports = app;
