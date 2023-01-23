"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  findManagers: async () => {
    const entities = await strapi
      .query("project")
      .find({}, ["manager", "manager.firstName", "manager.lastName"]);

    return entities.map((entity) => entity.manager).filter((e) => e);
  },
};
