"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

async function sendEmail(from, to, subject, text) {
  await strapi.services.mail.send(from, to, subject, text);
}

module.exports = {
  async send(ctx) {
    const { from, to, subject, text } = ctx.request.body;

    if (Array.isArray(to)) {
      to.forEach(
        async (recipient) => await sendEmail(from, recipient, subject, text)
      );
    } else {
      await sendEmail(from, to, subject, text);
    }

    return true;
  },
};
