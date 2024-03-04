const express = require('express');
const app = express();
const authRoutes = require('./src/routes/auth.routes.js');
const userRoutes = require('./src/routes/user.routes.js');
const bodyParser = require('body-parser')
const cors = require('cors');
const db = require('./src/config/config.js');
require('dotenv').config();


app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.listen(process.env.PORT, () => console.log('Express demo listening on port 3000!'));