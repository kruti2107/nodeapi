const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const db = require('./config/database');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const users = require('./controller/user.controller');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-3ky7j4rb.auth0.com/.well-known/jwks.json'
    }),
    audience: 'http://localhost:3000',
    issuer: 'https://dev-3ky7j4rb.auth0.com/',
    algorithms: ['RS256']
});
require('./router/user.router')(app);
require('./router/task.router')(app);
app.post('/users', users.create);

app.use(jwtCheck);
mongoose.Promise = global.Promise;

mongoose.connect(db.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.get('/', (req, res) => {
    res.json({"message": "Server is started.."});
});
app.get('/authorized', function (req, res) {
    res.send('Secured Resource');
});
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});