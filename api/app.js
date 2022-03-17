// Create server Express
const express = require('express');
const cors = require('cors');
//Routers

const app = express();
app.use(cors());

app.use(express.json());


