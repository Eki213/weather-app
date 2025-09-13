import { getWeatherData } from "./getWeatherData";
import { render, updateTemperatures } from "./render";
import { saveTemperatures } from "./temperatureData";

const form = document.querySelector("header form");
const select = document.querySelector(".select");
let currentScale = "fahrenheit";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!form.reportValidity()) return;

  const locationInput = form.querySelector("input");
  const weatherData = await getWeatherData(locationInput.value);
  saveTemperatures(weatherData);
  render(weatherData, currentScale);
});

select.addEventListener("click", (e) => {
  const scale = e.target.dataset.scale;
  if (!scale || currentScale === scale) return;
  currentScale = scale;
  updateTemperatures(currentScale);
  console.log(scale);
});
