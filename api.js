'use strict';
const _ = require('lodash');
const axios = require('axios').default;

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

    this.getRequest = function() {
      const instance = axios.create({
        baseURL: this.url,
        timeout: 1000,
        headers: {'X-Auth-App-Key': this.config.token},
        timeout: 3000
      });
      return instance;
    }
  }

  handleError(err) {
    console.error(err);
    throw err;
  }

 
  /**
   * 
   * @param {number} id 
   * @description Gets a client by it's id
   */
  async getClient(id = null) {
    try {
      const res = await this.getRequest().get(`/clients/${id}`);
      return res.data;
    } catch (error) {
      this.handleError(error);
    }
  }


  /**
   * 
   * @param {string} username 
   * @description Gets a client by it's username field.
   */
  async getClientsByUserName(username) {
    try {
      const res = await this.getRequest().get('/clients', {
        params: {
          username: username
        }
      });
      return res.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * 
   * @param {string} attributeKey 
   * @param {string} attributeValue 
   * @description Gets an array of clients matching a given custom atrribute value
   */
  async getClientsByCustomAttribute(attributeKey, attributeValue) {
    try {
      const res = await this.getRequest().get('/clients', {
        params: {
          customAttributeKey: attributeKey,
          customAttributeValue: attributeValue,
        }
      });
      return res.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * 
   * @param {string} queryString 
   * @returns {Promise} Returns a promise to an array of matching clients.
   * @description Gets a client by using an elastic search query string.
   */
  async findClient(queryString = '') {
    try {
      const res = this.getRequest().get('/mobile/clients/search', {
        params: {
          query: queryString
        }
      });
      return res.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * @returns {Promise}
   * @description Returns a promise to an array of invoice templates
   */
  async getInvoiceTemplates() {
    try {
      const res = await this.getRequest().get(`/invoice-templates`);
      return res.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * @returns {Promise}
   * @description Returns a promise to an array of custom attributes.
   */
  async getCustomAttributes() {
    try {
      const res = await this.getRequest().get(`/custom-attributes`);
      return res.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * @method getServices
   * @returns {Promise}
   * @description Returns a promise to an array of all stored services.
   */
  async getServices() {
    try {
      const response = await this.getRequest().get('/clients/services');
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * @param {Number} id 
   * @param {Object} data 
   * @returns {Promise}
   * @description Returns a promise to a patched invoice object.
   */
  async patchInvoice(id, data) {
    try {
      const res = await this.getRequest().patch(`/invoices/${id}`, {
        data: JSON.stringify(data)
      });
      return res.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * 
   * @param {Number} id 
   * @returns {Promise}
   * @description Returns a promise with the operation result.
   */
  async regenerateInvoicePdf(id) {
    try {
      const res = this.getRequest().patch(`/invoices/${id}/regenerate-pdf`);
      return res.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getInvoice(id) {
    try {
      const res = this.getRequest().get(`/invoices/${id}`);
      return res.data;
    } catch (error) {
      this.handleError(error);
    }
     
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

  async getServicePlan(id) {
    try {
      const response = await this.getRequest().get(`/service-plans/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }


  async postClientLog(id, msg) {
    let data = {
      clientId: id,
      message: msg
    };
    try {
      const res = await this.getRequest().post('/client-logs', {
        data: JSON.stringify(data)
      })
      return res.data;
    } catch (error) {
      this.handleError(error);
    }
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
