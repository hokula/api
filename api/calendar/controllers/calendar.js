"use strict";
const newDate = require("../../../utils/newDate");

/**
 * A set of functions called "actions" for `calendar`
 */

module.exports = {
  create: async (ctx) => {
    let { title, description, startTime, endTime, attendees } =
      ctx.request.body;

    // If no atttendees have been provided, assume it's a mass event
    if (!attendees) {
      const employees = await strapi.query("employee").find({}, []);
      attendees = employees.map((a) => ({ email: a.email }));
    }

    // If no start/end times have been provided, assume the event will take tomorrow, lasting for an hour
    if (!startTime || !endTime) {
      startTime = newDate();
      startTime = startTime.setDate(startTime.getDay() + 2);

      endTime = newDate();
      endTime = endTime.setDate(endTime.getDay() + 3);
    }

    const result = await strapi.services.calendar.createCalendarEvent({
      title,
      description,
      startTime,
      endTime,
      attendees,
    });

    // TODO: Validate if the result is an error or a proper Google Calendar API response
    return result;
  },
  find: async () => {},
};
