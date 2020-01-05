'use strict';
const Api = require('./api');

module.exports = class UCRM {
  constructor(config = {}) {
    this.api = new Api(config);
    console.log(`UCRM Connector instance up and ready for ${config.fqdn}`);
  }
};
