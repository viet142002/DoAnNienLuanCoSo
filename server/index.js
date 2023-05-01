const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRouter = require('./routers/auth');
const userRouter = require('./routers/userRouter');
const postRouter = require('./routers/postRouter');
const commentRouter = require('./routers/commentRouter');

const app = express();

app.use(cors());
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb' }));
app.use(cookieParser());

//ROUTERS
app.use('/api', authRouter);
app.use('/api', userRouter);
app.use('/api', postRouter);
app.use('/api', commentRouter);

dotenv.config();
//CONNECTION TO DATABASE
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to Database'))
  .catch((error) => console.log('Cant connect to server ', error));

//
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running port ${PORT}...`));
app.get('/', (req, res) => res.status(200).json('hello world'));
