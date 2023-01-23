"use strict";
const newDate = require("../../../utils/newDate");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  create: async (data) => {
    try {
      data.dateCelebrated = newDate(data.dateCelebrated);
      data.nonWorkingDayDate = newDate(data.nonWorkingDayDate);

      // Create entry in the non-working holidays collection
      const entry = await strapi.query("non-working-holiday").create(data);

      // Return the entry from the collection
      return entry;
    } catch (error) {
      console.error(error);
    }
  },
  update: async ({ id }, data) => {
    try {
      data.dateCelebrated = newDate(data.dateCelebrated);
      data.nonWorkingDayDate = newDate(data.nonWorkingDayDate);

      return await strapi.query("non-working-holiday").update({ id }, data);
    } catch (error) {
      console.error(error);
    }
  },
};
