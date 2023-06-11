// Definisi Library yang digunakan
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const flash = require('req-flash');
const app = express();

// Definisi lokasi file router
const loginRoutes = require('./src/routes/router-login');
const registerRoutes = require('./src/routes/router-register');
const appRoutes = require('./src/routes/router-app');

// Menyajikan file statis dari folder "public"
app.use(express.static(__dirname + '/src/public'));


// Configurasi dan gunakan library
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Configurasi library session
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'deguru766@hi',
    name: 'secretName',
    cookie: {
        sameSite: true,
        maxAge: 1800000     //mengatur sesi cokie
    },
}))
app.use(flash());

// Setting folder views
app.set('views',path.join(__dirname,'src/views'));
app.set('view engine', 'ejs');

// Gunakan routes yang telah didefinisikan
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);

app.use('/', appRoutes);

// Gunakan port server
app.listen(3000, ()=>{
    console.log('Server Berjalan di Port : '+3000);
});


