//state
let currCity = "Paris";
let units = "metric";

//Selectors
let city = document.querySelector(".weather__city");
let datetime = document.querySelector(".weather__datetime");
let forecast = document.querySelector(".weather__forecast");
let icon = document.querySelector(".weather__icon");
let temp = document.querySelector(".weather__temp");
let min = document.querySelector(".weather__min");
let max = document.querySelector(".weather__max");
let feelsLike = document.querySelector(".weather__feels__like");
let humidity = document.querySelector(".weather__humidity");
let wind = document.querySelector(".weather__wind");
let pressure = document.querySelector(".weather__pressure");

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

document
  .querySelector(".metric__button")
  .addEventListener("click", function () {
    if (units !== "metric") {
      units = "metric";
      getWeather();
    } else {
      return;
    }
  });

document
  .querySelector(".imperial__button")
  .addEventListener("click", function () {
    if (units !== "imperial") {
      units = "imperial";
      getWeather();
    } else {
      return;
    }
  });

document
  .querySelector(".search__city")
  .addEventListener("submit", function (e) {
    let search = document.querySelector(".search__cityinput");
    e.preventDefault();

    currCity = search.value;

    getWeather();

    search.value = "";
  });

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
  city.innerHTML = `${weatherData.name}, 
                    ${convertCountryCode(weatherData.sys.country)}`;
  datetime.innerHTML = convertLocalTime(weatherData.dt, weatherData.timezone);
  forecast.innerHTML = weatherData.weather[0].main;
  icon.innerHTML = `<img
            src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png"
            alt="weather icon"
          />`;
  temp.innerHTML = `${parseInt(weatherData.main.temp)}&deg;`;
  min.innerHTML = `Min: ${weatherData.main.temp_min.toFixed()}&deg;`;
  max.innerHTML = `Max: ${weatherData.main.temp_max.toFixed()}&deg;`;
  feelsLike.innerHTML = `${weatherData.main.feels_like.toFixed()}&deg;`;
  humidity.innerHTML = `${weatherData.main.humidity}%`;
  wind.innerHTML = `${weatherData.wind.speed} m/s`;
  pressure.innerHTML = `${weatherData.main.pressure} hPa`;
}

document.body.addEventListener("load", getWeather());
