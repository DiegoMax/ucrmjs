'use strict';
const rp = require('request-promise-native');
const _ = require('lodash');

module.exports = class UCRMApi {
  constructor(config = {}) {
    this.config = config;
    this.url =
      (this.config.ssl ? 'https://' : 'http://') +
      this.config.fqdn +
      '/api/v1.0';
      console.log(
        `UCRM Connector instance up and ready for ${this.config.fqdn}`,
      );
  }

  /**
   * 
   * @param {Object} params 
   */
  getRequest(params = {}) {
    let options = {
      baseUrl: this.url,
      headers: {
        'X-Auth-App-Key': this.config.token,
      },
      json: true,
    };
    return rp.defaults(_.merge(options, params));
  }


  /**
   * 
   * @param {number} id 
   * @description Gets a client by it's id
   */
  getClient(id = null) {
    return this.getRequest().get(`/clients/${id}`);
  }


  /**
   * 
   * @param {string} username 
   * @description Gets a client by it's username field.
   */
  getClientsByUserName(username) {
    return this.getRequest({
      qs: {
        username: username,
      },
    }).get(`/clients`);
  }

  /**
   * 
   * @param {string} attributeKey 
   * @param {string} attributeValue 
   * @description Gets an array of clients matching a given custom atrribute value
   */
  getClientsByCustomAttribute(attributeKey, attributeValue) {
    return this.getRequest({
      qs: {
        customAttributeKey: attributeKey,
        customAttributeValue: attributeValue,
      },
    }).get(`/clients`);
  }

  /**
   * 
   * @param {string} queryString 
   * @returns {Promise} Returns a promise to an array of matching clients.
   * @description Gets a client by using an elastic search query string.
   */
  findClient(queryString = '') {
    return this.getRequest({
      qs: {
        query: queryString,
      },
    }).get(`/mobile/clients/search`);
  }

  /**
   * @returns {Promise}
   * @description Returns a promise to an array of invoice templates
   */
  getInvoiceTemplates() {
    return this.getRequest().get(`/invoice-templates`);
  }

  /**
   * @returns {Promise}
   * @description Returns a promise to an array of custom attributes.
   */
  getCustomAttributes() {
    return this.getRequest().get(`/custom-attributes`);
  }

  /**
   * @method getServices
   * @returns {Promise}
   * @description Returns a promise to an array of all stored services.
   */
  getServices() {
    return this.getRequest().get(`/clients/services`);
  }

  /**
   * @param {Number} id 
   * @param {Object} data 
   * @returns {Promise}
   * @description Returns a promise to a patched invoice object.
   */
  patchInvoice(id, data) {
    return this.getRequest({
      body: data,
    }).patch(`/invoices/${id}`);
  }

  /**
   * 
   * @param {Number} id 
   * @returns {Promise}
   * @description Returns a promise with the operation result.
   */
  regenerateInvoicePdf(id) {
    return this.getRequest().patch(`/invoices/${id}/regenerate-pdf`);
  }

  getInvoice(id) {
    return this.getRequest().get(`/invoices/${id}`);
  }

  sendInvoice(id) {
    return this.getRequest().patch(`/invoices/${id}/send`);
  }

  getOrganizations() {
    return this.getRequest().get(`/organizations`);
  }

  getOrganization(id) {
    return this.getRequest().get(`/organizations/${id}`);
  }


  postClientLog(id, msg) {
    let data = {
      clientId: id,
      message: msg
    };
    return this.getRequest({
      body: data,
    }).post(`/client-logs`);
  }

  /* HELPERS */

  getServiceAttribute(service, attributeName) {
    if (!service) return null;
    let attr = null;
    _.forEach(service.attributes, attribute => {
        if (attribute.name == attributeName) {
            attr = attribute;
        }
    });
    return attr;
  }

  getClientAttribute(client, attributeName) {
    if (!client) return null;
    let attr = null;
    _.forEach(client.attributes, attribute => {
        if (attribute.name == attributeName) {
            attr = attribute;
        }
    });
    return attr;
  }
  
  getInvoiceAttribute(invoice, attributeName) {
    if (!invoice) return null;
    let attr = null;
    _.forEach(invoice.attributes, attribute => {
        if (attribute.name == attributeName) {
            attr = attribute;
        }
    });
    return attr;
  }
};
