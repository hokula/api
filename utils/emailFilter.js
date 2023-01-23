const emailRegExp = /^([a-z])+@capeannenterprises.com$/;
const formatError = (error) => [
  { messages: [{ id: error.id, message: error.message, field: error.field }] },
];
module.exports = function (email) {
  const isEmail = emailRegExp.test(email);
  return isEmail;
};
