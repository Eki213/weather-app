import { format, formatTemp } from "./dayFormatter";
import waterDropImg from "../assets/water-drop.png";

function createDayItem(formattedDay) {
  const dayItem = document.createElement("li");
  dayItem.className = "dayItem";

  const datePara = document.createElement("p");
  datePara.textContent = formattedDay.datetime;
  datePara.className = "date";

  const icon = document.createElement("img");
  icon.src = formattedDay.icon;
  const iconContainer = document.createElement("div");
  iconContainer.className = "icon";
  iconContainer.appendChild(icon);

  const info = document.createElement("div");
  info.className = "info";

  const temperaturesDiv = document.createElement("div");
  temperaturesDiv.className = "temperatures";
  const minTempPara = document.createElement("p");
  minTempPara.textContent = formattedDay.tempmin;
  minTempPara.className = "min-temp";
  const maxTempPara = document.createElement("p");
  maxTempPara.textContent = formattedDay.tempmax;
  maxTempPara.className = "max-temp";
  temperaturesDiv.appendChild(maxTempPara);
  temperaturesDiv.appendChild(minTempPara);

  const precipEl = document.createElement("div");
  precipEl.className = "precip";
  const precipProbPara = document.createElement("p");
  precipProbPara.textContent = formattedDay.precipprob;
  precipProbPara.className = "precip-prob";

  const precipImgContainer = document.createElement("div");
  precipImgContainer.className = "precip-img";
  const precipImg = document.createElement("img");
  precipImg.src = waterDropImg;
  precipImgContainer.appendChild(precipImg);

  precipEl.appendChild(precipImgContainer);
  precipEl.appendChild(precipProbPara);

  info.appendChild(datePara);
  info.appendChild(iconContainer);
  info.appendChild(temperaturesDiv);
  info.appendChild(precipEl);

  const descriptionDiv = document.createElement("div");
  descriptionDiv.className = "description";
  const conditionsPara = document.createElement("p");
  conditionsPara.textContent = formattedDay.conditions;
  const infoPara = document.createElement("p");
  infoPara.textContent = formattedDay.description;
  descriptionDiv.appendChild(conditionsPara);
  descriptionDiv.appendChild(infoPara);

  dayItem.appendChild(info);
  dayItem.appendChild(descriptionDiv);
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
    temperatures[0].textContent = maxTemp;
    temperatures[1].textContent = minTemp;
  });
}

export function toggleLoading() {
  const spinner = document.querySelector(".spinner");
  const forecastEl = document.querySelector(".forecast");
  spinner.hidden = !spinner.hidden;
  forecastEl.hidden = !forecastEl.hidden;
}
