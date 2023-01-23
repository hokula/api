"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  findWithoutPopulatingEmployees: async () => {
    const projects = await strapi.query("project").find({}, []);

    return projects;
  },
  findManagers: async () => {
    return await strapi.services.project.findManagers();
  },
};
