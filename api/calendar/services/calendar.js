"use strict";
const { calendar, oAuth2Client } = require("../../../utils/calendar");
const newDate = require("../../../utils/newDate");

const generateColorID = () => {
  const id = Math.floor(Math.random() * 12);
  return id === 0 ? 1 : id;
};

const buildEvent = (
  title,
  description,
  startTime,
  endTime,
  attendees,
  timeZone = "Europe/London" // Europe/London === GMT
) => ({
  summary: title,
  location: null,
  description,
  start: {
    dateTime: newDate(startTime),
    timeZone,
  },
  end: {
    dateTime: newDate(endTime),
    timeZone,
  },
  colorId: generateColorID(),
  attendees,
});

module.exports = {
  createCalendarEvent: async (data) => {
    const { title, description, startTime, endTime, attendees } = data;
    const event = buildEvent(title, description, startTime, endTime, attendees);

    try {
      const result = await calendar.events.insert({
        auth: oAuth2Client,
        calendarId: "primary",
        resource: event,
      });

      return result;
    } catch (error) {
      console.error(error);
      return new Error("An error has occured!");
    }
  },
};
