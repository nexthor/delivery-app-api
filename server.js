// mysql root password: MySQL2023$

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const keys = require('./config/keys');

// importar las rutas
const userRoutes = require('./routes/userRoutes');

const port = process.env.PORT || 3000;

app.use(logger('dev'));
// parse request in json
app.use(express.json());
app.use(express.urlencoded(
    {
        extended: true
    }
));
app.use(cors());
app.use(require('express-session')({ secret: keys.secretOrKey, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.disable('x-powered-by');
app.set('port', port);

// llamadas de rutas
userRoutes(app);

server.listen(3000, '192.168.1.12' || 'localhost', function(){
    console.log('aplicación de Nodejs ' + process.pid + ' iniciada...');
});

app.get('/', (req, res) => {
    res.send('flutter delivery app');
});

app.get('/test', (req, res) => {
    res.send('ruta de prueba');
});

// ERROR HANDLER
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});