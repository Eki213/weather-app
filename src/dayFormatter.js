import { format as formatDate, parse } from "date-fns";
import { getTemperatures } from "./temperatureData";

export async function format(dayData, index, scale) {
  const formattedDay = {};

  formattedDay.precipprob = `${dayData.precipprob}%`;
  const date = parse(dayData.datetime, "yyyy-MM-dd", new Date());
  formattedDay.datetime = formatDate(date, "EEEE, d MMM");

  const [minTemp, maxTemp] = formatTemp(index, scale);
  formattedDay.tempmin = minTemp;
  formattedDay.tempmax = maxTemp;

  const mod = await import(`../assets/${dayData.icon}.png`);
  formattedDay.icon = mod.default;

  return Object.assign(dayData, formattedDay);
}

export function formatTemp(index, scale) {
  const temperatures = getTemperatures();
  let unit = "°F";
  if (scale === "celsius") unit = "°C";
  const [minTemp, maxTemp] = temperatures[index][scale];

  return [minTemp + unit, maxTemp + unit];
}
