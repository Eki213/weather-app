import { format, formatTemp } from "./dayFormatter";

function createDayItem(formattedDay) {
  const dayItem = document.createElement("li");
  dayItem.className = "dayItem";

  const datePara = document.createElement("p");
  datePara.textContent = formattedDay.datetime;

  const icon = document.createElement("img");
  icon.src = formattedDay.icon;

  const temperaturesDiv = document.createElement("div");
  temperaturesDiv.className = "temperatures";
  const minTempPara = document.createElement("p");
  minTempPara.textContent = formattedDay.tempmin;
  const maxTempPara = document.createElement("p");
  maxTempPara.textContent = formattedDay.tempmax;
  temperaturesDiv.appendChild(minTempPara);
  temperaturesDiv.appendChild(maxTempPara);

  const descriptionDiv = document.createElement("div");
  descriptionDiv.className = "description";
  const conditionsPara = document.createElement("p");
  conditionsPara.textContent = formattedDay.conditions;
  const infoPara = document.createElement("p");
  infoPara.textContent = formattedDay.description;
  descriptionDiv.appendChild(conditionsPara);
  descriptionDiv.appendChild(infoPara);

  const precipProbPara = document.createElement("p");
  precipProbPara.textContent = formattedDay.precipprob;

  dayItem.appendChild(datePara);
  dayItem.appendChild(icon);
  dayItem.appendChild(temperaturesDiv);
  dayItem.appendChild(descriptionDiv);
  dayItem.appendChild(precipProbPara);
  console.log(formattedDay);

  return dayItem;
}

export async function render(data, scale = "fahrenheit") {
  const forecastEl = document.querySelector(".forecast");
  forecastEl.replaceChildren();

  for (let [index, dayData] of data.days.entries()) {
    const formattedDay = await format(dayData, index, scale);
    const dayItem = createDayItem(formattedDay);
    forecastEl.appendChild(dayItem);
  }
}

export function updateTemperatures(scale) {
  const dayItems = document.querySelectorAll(".dayItem");
  if (!dayItems.length) return;

  dayItems.forEach((dayItem, index) => {
    const [minTemp, maxTemp] = formatTemp(index, scale);
    const temperatures = dayItem.querySelectorAll(".temperatures p");
    temperatures[0].textContent = minTemp;
    temperatures[1].textContent = maxTemp;
  });
}
