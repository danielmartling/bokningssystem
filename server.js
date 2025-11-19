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

// Middleware
const { roleRedirect } = require('./src/middleware/redirect');
const { requireLogin, requireRoles } = require('./src/middleware/auth');

// Access static resources folders
app.use('/img', express.static(path.join(__dirname, 'resources/img')));
app.use('/icons', express.static(path.join(__dirname, 'resources/icons')));
app.use('/templates', express.static(path.join(__dirname, 'resources/templates')));
app.use('/docs', express.static(path.join(__dirname, 'docs')));

app.use(
    '/staff',
    requireLogin,
    requireRoles(["staff"]),
    express.static(path.join(__dirname, 'public/staff'))
);

app.use(
    '/guest',
    requireLogin,
    requireRoles(["guest"]),
    express.static(path.join(__dirname, 'public/guest'))
);

// Root route
app.get('/', roleRedirect);

app.use(express.static(path.join(__dirname, 'public')));


const { initDatabase } = require("./src/db");
app.use('/api/login', require('./src/db/routes/login'));
app.use('/api/logout', require('./src/db/routes/logout'));
app.use('/api/groups', require('./src/db/routes/groups'));
app.use('/api/programday', require('./src/db/routes/programDays'));

initDatabase().then(() => {
    app.listen(process.env.PORT, (err) => {
        if (err) {
            console.error('Error starting the server:', err);
            return;
        }
        console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
})
