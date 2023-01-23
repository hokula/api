"use strict";
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async afterCreate(data) {
      const extractedData = {
        title: data.name,
        description: data.description || data.name,
        startTime: data.dateCelebrated,
        endTime: data.nonWorkingDayDate,
        attendees: [],
      };

      // Create entry in the calendar
      await strapi.services.calendar.createCalendarEvent(extractedData);
    },
  },
};
