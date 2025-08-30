export async function getWeatherData(location) {
  const baseLink =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
  const endpoint = `${encodeURIComponent(location)}/next7days`;
  const elements = [
    "datetime",
    "name",
    "address",
    "resolvedAddress",
    "tempmax",
    "tempmin",
    "temp",
    "feelslikemax",
    "feelslikemin",
    "feelslike",
    "humidity",
    "precip",
    "precipprob",
    "precipcover",
    "preciptype",
    "windspeed",
    "windspeedmax",
    "windspeedmean",
    "windspeedmin",
    "winddir",
    "conditions",
    "description",
    "icon",
  ];

  const params = new URLSearchParams();
  params.append("unitGroup", "us");
  params.append("elements", elements.join(","));
  params.append("include", "days");
  params.append("key", "D7MPW576AKS4URMS7Z7MWYVHU");
  params.append("contentType", "json");

  const link = `${baseLink}${endpoint}?${params}`;

  try {
    const response = await fetch(link);
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
}
