export const movieDuration = (minutes) => {
  let duration;
  if (minutes < 60) {
    duration = minutes + " м.";
  } else {
    duration = Math.trunc(minutes / 60) + " ч. " + (minutes % 60) + " м.";
  }
  return duration;
};
