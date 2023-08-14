const express = require('express');
const data = require('./data.json');
const path = require('path');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static('public'));
app.use(express.json());
//import route module
const indexRouter = require('./routes/index');
//use route module
app.use('/', indexRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

module.exports = app;

