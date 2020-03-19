'use strict';
const Api = require('./api');

class Singleton {
  constructor(config) {
    if (!Singleton.instance) {
        Singleton.instance = new Api(config);
    }
  }

  getInstance() {
      return Singleton.instance;
  }
}

module.exports = Singleton;