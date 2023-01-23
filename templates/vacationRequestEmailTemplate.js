const transformDateToString = require("../utils/transformDateToString");

/**
 *
 * @param {Date} startDate Vacation request start date
 * @param {Date} endDate Vacation request end date
 * @param {string | null(default)} status A substring of the template declaring if the request has been approved or declined
 * @returns {string} String/email template
 */
module.exports = (startDate, endDate, status = null) => {
  const timestamps = {
    start: transformDateToString(startDate),
    end: transformDateToString(endDate),
  };
  if (!status) {
    return `Hello! I would like to a vacation leave from ${timestamps.start} to ${timestamps.end}. Thanks forwardly!`;
  } else {
    return `Hello! Your vacation request in the timeframe of ${timestamps.start} to ${timestamps.end} has been ${status}.`;
  }
};
