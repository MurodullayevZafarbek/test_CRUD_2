const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors")


const app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', require('./routes/user'));
app.use('/group', require('./routes/group'));

const PORT = process.env.port || 3006
app.listen(PORT, () => {
    console.log(`app listien on port ${PORT}`);
})
