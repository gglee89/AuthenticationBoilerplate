const express = require('express');
const http = require('http');
const bodyParser = require("body-parser");
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

// DB Setup
mongoose.connect('mongodb://localhost/auth', {useNewUrlParser: true});

// App Middleware Setup
app.use(morgan('combined')); // LOG incomsing Requests
app.use(cors());
app.use(bodyParser.json({ type: '*/*' })); // Parse all INCOMING REQUESTS in 'body' attribute

// App Router Setup
router(app);

// Server Setup
const PORT = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(PORT);
console.log(`Server started. Listening to PORT ${PORT}`);