'use strict';
const rp = require('request-promise-native');
const _ = require('lodash');

module.exports = class UCRMApi {
  constructor(config) {
    this.config = config;
    this.url =
      (this.config.use_ssl ? 'https://' : 'http://') +
      this.config.fqdn +
      '/api/v1.0';
  }

  getRequest(params = {}) {
    let options = {
      baseUrl: this.url,
      headers: {
        'X-Auth-App-Key': this.config.app_token,
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
