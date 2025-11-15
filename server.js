/////////////////////////////
// server.js
/////////////////////////////

// Required packages
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('dotenv').config({ quiet: true });

const path = require('path');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser(process.env.COOKIE_SECRET));

// Access static resources folders
app.use('/img', express.static(path.join(__dirname, 'resources/img')));
app.use('/icons', express.static(path.join(__dirname, 'resources/icons')));
app.use('/templates', express.static(path.join(__dirname, 'resources/templates')));
app.use('/docs', express.static(path.join(__dirname, 'docs')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use(express.static(path.join(__dirname, 'public')));

const { initDatabase } = require("./src/db");
app.use('/api/groups', require('./src/db/routes/groups'));

initDatabase().then(() => {
    app.listen(process.env.PORT, (err) => {
        if (err) {
            console.error('Error starting the server:', err);
            return;
        }
        console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
})
