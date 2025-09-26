let temperatures = [];

export function saveTemperatures(data) {
  temperatures = [];
  data.days.forEach((dayData) => {
    temperatures.push({
      fahrenheit: [Math.round(dayData.tempmin), Math.round(dayData.tempmax)],
      celsius: [toCelsius(dayData.tempmin), toCelsius(dayData.tempmax)],
    });
  });
}

export const getTemperatures = () => [...temperatures];

function toCelsius(fahrenheit) {
  return Math.round((fahrenheit - 32) * (5 / 9));
}
