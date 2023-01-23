module.exports = ({ env }) => ({
  email: {
    provider: "sendgrid",
    providerOptions: {
      apiKey: env("SENDGRID_API_KEY"),
    },
    settings: {
      defaultFrom: "donder@capeannenterprises.com",
      defaultReplyTo: "donder@capeannenterprises.com",
      testAddress: "donder@capeannenterprises.com",
    },
  },
});
