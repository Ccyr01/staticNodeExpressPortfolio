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

app.use((req, res, next) => {
    const error = new Error('404 Not Found');
    error.status = 404;
    console.error(`${error.message} (${error.status})`);
    res.render('page-not-found');
    next(error);

});

app.use((err, req, res, next) => {
    if(!err.status){
        err.status = 500;
        err.message = 'Something went wrong with server';
        res.status(err.status).send(`${err.status} ${err.message}`);
        res.render('error');
    }
});

module.exports = app;

