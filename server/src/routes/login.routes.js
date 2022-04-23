module.exports = (app, pool) => {
    const users = require('../controllers/user.controller.js');
    var router = require('express').Router();

    router.post('/create', users.create);
    // Retrieve all Tutorials
    // router.get('/', tutorials.findAll);
    // // Retrieve all published Tutorials
    // router.get('/published', tutorials.findAllPublished);
    // // Retrieve a single Tutorial with id
    router.post('/login', users.login);
    // // Update a Tutorial with id
    // router.put('/:id/forms', users.getForms);
    // // Delete a Tutorial with id
    // router.delete('/:id', tutorials.delete);
    // // Create a new Tutorial
    // router.delete('/', tutorials.deleteAll);
    app.use('/api/users', router);
};
