export const getEndTimeByDuration = (startTime, duration) => {
  const [startHours, startMinutes] = startTime.split(":").map(Number);

  const totalStartMinutes = startHours * 60 + startMinutes;

  const totalEndMinutes = totalStartMinutes + Number(duration);

  const endHours = Math.floor(totalEndMinutes / 60);
  const endMinutes = totalEndMinutes % 60;

  const formattedEndHours = String(endHours).padStart(2, "0");
  const formattedEndMinutes = String(endMinutes).padStart(2, "0");

  return `${formattedEndHours}:${formattedEndMinutes}`;
};
