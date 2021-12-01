'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./o.production.min.js');
} else {
  module.exports = require('./o.development.js');
}