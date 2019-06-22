const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const serversRouter = require('./routes/servers');
const hostingRouter = require('./routes/hosting');

const app = express();

const notFoundPage = (path) => {
    return (req, res, next) => {
        res.sendFile(path);
    }
};

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/servers', serversRouter);
app.use('/hosting', hostingRouter);
app.use(notFoundPage(path.join(__dirname, 'public', '404.html')));

module.exports = app;