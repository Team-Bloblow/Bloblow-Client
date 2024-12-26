const getDateDiff = (dateStr, dateComparedStr) => {
  if (typeof dateStr !== "string" || typeof dateComparedStr !== "string") {
    return null;
  }

  const date = dateStr === "today" ? new Date() : new Date(dateStr);
  const dateCompared = new Date(dateComparedStr);
  const dateDiff = date.getTime() - dateCompared.getTime();

  return Math.ceil(dateDiff / (1000 * 60 * 60 * 24));
};

export default getDateDiff;
