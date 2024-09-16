const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const ProductRoute=require('./Routes/ProductRouter')
require('dotenv').config();
require('./Models/db');

const PORT = process.env.PORT || 8080;

// Middleware setup
app.use(bodyParser.json());
app.use(cors());

// Route setup
const AuthRouter = require('./Routes/AuthRouter');
app.use('/auth', AuthRouter);
app.use('/products',ProductRoute);
// Test route
// app.get('/ping', (req, res) => {
//     res.send('pingpong');
// });

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
