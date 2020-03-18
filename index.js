'use strict';
require('dotenv').config();
const Api = require('./api');

class Singleton {
  constructor() {
    if (!Singleton.instance) {
        Singleton.instance = new Api();
    }
  }

  getInstance() {
      return Singleton.instance;
  }
}

module.exports = Singleton;