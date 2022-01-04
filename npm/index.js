'use strict';

if (process.env.NODE_ENV === 'development') {
  module.exports = require('./o.development.js');
} else {
  module.exports = require('./o.production.min.js');
}