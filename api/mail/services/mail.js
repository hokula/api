"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  /**
   *
   * @param {string} from Sender's email address
   * @param {string} to Recipient's email address
   * @param {string} subject The subject of the email
   * @param {string} text The content of the email
   * @returns void
   */
  send: async (from, to, subject, text) => {
    await strapi.plugins["email"].services.email.send({
      from,
      to,
      subject,
      text,
    });
  },
};
