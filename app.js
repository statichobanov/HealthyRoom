const express = require('express');
const http = require('http');
const path = require('path');
const server = require('./config/server');
const controllers = require('./controllers/index');
const app = express();
const favicon = require('serve-favicon');
const database = require('./config/database');

server(app);

app.set('views', `${__dirname}/views`);
app.use(favicon(path.join(__dirname, 'public', 'panaceya-fav-icon.png')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', controllers.home);
app.get('/aboutus', controllers.aboutUs);
app.get('/partnership', controllers.partnership);
app.post('/joinus', controllers.joinUs);
app.get('/products', controllers.pdp);

database.connectToServer((err) => {
    if (err) console.log('Error connecting with the Database'); 

    http.createServer(app).listen(app.get('port'), () => {
        console.log('\n' + `Express server listening on port ${app.get('port')}`);
    });
})
