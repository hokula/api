'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  create: async ctx => {
    const { files, date } = ctx.request.body;

    // Response payload
    const response = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const user = await strapi.query("user", "users-permissions").findOne({username: file.name.replace(".pdf", "") });

      // If no user has been found, bail
      if (!user) break;

      // Create a salary slip entry
      const entry = await strapi.services["salary-slip"].create({
        sentAt: date,
        slip: file.id,
        employee: user.id
      });

      // Push entry to response payload
      response.push(entry);
    }

    return response;
  }
};
