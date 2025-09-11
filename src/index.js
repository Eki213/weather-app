import { getWeatherData } from "./getWeatherData";


const form = document.querySelector("header form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!form.reportValidity()) return;

  const locationInput = form.querySelector("input");
  const weatherData = getWeatherData(locationInput.value);
  weatherData.then(console.log);
});