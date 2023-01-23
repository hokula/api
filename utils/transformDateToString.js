/**
 *
 * @param {Date} date The date object that will be transformed to a string
 * @returns {string} The transformed string
 */
module.exports = (date) => {
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1; //months from 1-12
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
};
