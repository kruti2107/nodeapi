module.exports = (app) => {
    const users = require('../controller/user.controller');

    app.post('/users/login', users.login);

};