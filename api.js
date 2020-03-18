'use strict';
const rp = require('request-promise-native');
const _ = require('lodash');

module.exports = class UCRMApi {
  constructor() {
    this.url =
      (process.env.UCRM_SSL ? 'https://' : 'http://') +
      process.env.UCRM_FQDN +
      '/api/v1.0';
      console.log(
        `UCRM Connector instance up and ready for ${process.env.UCRM_FQDN}`,
      );
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

  getClientsByCustomAttribute(attributeKey, attributeValue) {
    return this.getRequest({
      qs: {
        customAttributeKey: attributeKey,
        customAttributeValue: attributeValue,
      },
    }).get(`/clients`);
  }

  getCustomAttributeForClient(clientId, attributeKey) {}

  findClient(queryString = '') {
    return this.getRequest({
      qs: {
        query: queryString,
      },
    }).get(`/mobile/clients/search`);
  }

  getOrganizationById(id) {
    return this.getRequest().get(`/organizations/${id}`);
  }

  getInvoiceTemplates() {
    return this.getRequest().get(`/invoice-templates`);
  }

  getCustomAttributes() {
    return this.getRequest().get(`/custom-attributes`);
  }

  getServices() {
    return this.getRequest().get(`/clients/services`);
  }

  patchInvoice(id, data) {
    return this.getRequest({
      body: data,
    }).patch(`/invoices/${id}`);
  }

  regenerateInvoicePdf(id) {
    return this.getRequest().patch(`/invoices/${id}/regenerate-pdf`);
  }

  sendInvoice(id) {
    return this.getRequest().patch(`/invoices/${id}/send`);
  }
};
