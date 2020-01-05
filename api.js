'use strict';
const rp = require('request-promise-native');
const _ = require('lodash');

module.exports = class UCRMApi {
  constructor() {
    this.url =
      (process.env.UCRM_SSL ? 'https://' : 'http://') +
      process.env.UCRM_FQDN +
      '/api/v1.0';
  }

  getRequest(params = {}) {
    let options = {
      baseUrl: this.url,
      headers: {
        'X-Auth-App-Key': process.env.UCRM_APP_TOKEN,
      },
      json: true,
    };
    return rp.defaults(_.merge(options, params));
  }

  getClientById(id = null) {
    return this.getRequest().get(`/clients/${id}`);
  }

  getClientsByUserName(username) {
    return this.getRequest({
      qs: {
        username: username,
      },
    }).get(`/clients`);
  }

  findClient(queryString = '') {
    return this.getRequest({
      qs: {
        query: queryString,
      },
    }).get(`/mobile/clients/search`);
  }
};
