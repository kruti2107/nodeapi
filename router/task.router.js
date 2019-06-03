module.exports = (app) => {
    const tasks = require('../controller/task.controller');

    app.get('/tasks', tasks.getTask);

};