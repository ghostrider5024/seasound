const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const router = require('./routes');

const PORT = process.env.PORT || 5000;

dotenv.config();
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// router
router(app)

// server start
app.listen(PORT, () => {
    console.log(`Server is running on PORT: http://localhost:${PORT}/api`);
})