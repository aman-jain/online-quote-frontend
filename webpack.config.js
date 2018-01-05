'use strict';

const dev = require('./build-modules/webpack/config.dev');
const prod = require('./build-modules/webpack/config.prod');

module.exports = Object.assign({}, process.env.NODE_ENV === 'production'?prod:dev)
