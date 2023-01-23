module.exports = (date, daysToAddOrSubtract = 0) => {
  const dateBuilder = new Date(
    (typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {
      timeZone: "Europe/Sarajevo",
    })
  );

  // TODO: Remove this block once a better solution for fixing the date difference has been found
  if (process.env.NODE_ENV === "production") {
    dateBuilder.setDate(dateBuilder.getDate() + daysToAddOrSubtract);
  }

  return dateBuilder;
};
