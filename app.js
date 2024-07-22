//state
let currCity = "London";
let units = "metric";

//Selectors
let city = document.querySelector(".weather-city");
let datetime = document.querySelector(".weather-dataetime");

//convert country code to name
function convertCountryCode(country) {
  let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  return regionNames.of(country);
}

function getWeather() {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=${units}`
  )
    .then((res) => res.json())
    .then((data) => {
      city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`;
      // datetime.innerHTML =
    });
}

document.body.addEventListener("load", getWeather());
