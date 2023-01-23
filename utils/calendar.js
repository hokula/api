const { google } = require("googleapis");
const { OAuth2 } = google.auth;

const oAuth2Client = new OAuth2({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

const calendar = google.calendar({
  version: "v3",
  auth: oAuth2Client,
});

oAuth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

module.exports = {
  calendar,
  oAuth2Client,
};
