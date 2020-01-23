const express = require('express');

const devController = require('./controllers/devController');
const searchController = require('./controllers/searchController');

const routes = new express.Router();

routes.get('/devs', devController.index);
routes.post('/devs', devController.store);

routes.get('/search', searchController.index);

module.exports = routes;
