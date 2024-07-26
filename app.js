//state
let currCity = "Turlock";
let units = "imperial";

//Selectors
let city = document.querySelector(".weather__city");
let datetime = document.querySelector(".weather__datetime");
let forecast = document.querySelector(".weather__forecast");

//convert country code to name
function convertCountryCode(country) {
  let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  return regionNames.of(country);
}

//get local time at time zone
function convertLocalTime(timestamp, timezone) {
  const convertTimezone = timezone / 3600;
  const date = new Date(timestamp * 1000);

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: `Etc/GMT${convertTimezone >= 0 ? "-" : "+"}${Math.abs(
      convertTimezone
    )}`,
    hour12: true,
  };
  return date.toLocaleString("en-US", options);
}

async function getWeather() {
  async function connectToWeather() {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=${units}`
      );
      return res.json();
    } catch (error) {
      console.error(error);
    }
  }
  const weatherData = await connectToWeather();

  city.innerHTML = `${weatherData.name} , 
                    ${convertCountryCode(weatherData.sys.country)}`;
  datetime.innerHTML = convertLocalTime(weatherData.dt, weatherData.timezone);
  forecast.innerHTML = weatherData.weather[0].main;
}

document.body.addEventListener("load", getWeather());
