import { getWeatherData } from "./getWeatherData";
import { render, toggleLoading, updateTemperatures } from "./render";
import { saveTemperatures } from "./temperatureData";
import "./styles.css";

const form = document.querySelector("header form");
const select = document.querySelector(".select");
let currentScale = "fahrenheit";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!form.reportValidity()) return;

  toggleLoading();
  const locationInput = form.querySelector("input");
  const weatherData = await getWeatherData(locationInput.value);
  if (weatherData) saveTemperatures(weatherData);
  render(weatherData, currentScale).then(toggleLoading);
});

select.addEventListener("click", (e) => {
  const scale = e.target.dataset.scale;
  if (!scale || currentScale === scale) return;
  const currentSelection = document.querySelector(
    `span[data-scale="${currentScale}"]`,
  );
  const newSelection = document.querySelector(`span[data-scale="${scale}"]`);
  currentSelection.classList.remove("active");
  newSelection.classList.add("active");
  currentScale = scale;
  updateTemperatures(currentScale);
});
