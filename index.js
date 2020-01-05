'use strict';
require('dotenv').config();
const Api = require('./api');

module.exports = class UCRM {
  constructor(config = {}) {
    this.api = new Api();
    console.log(
      `UCRM Connector instance up and ready for ${process.env.UCRM_FQDN}`,
    );
  }
};
