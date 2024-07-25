//state
let currCity = "Turlock";
let units = "imperial";

//Selectors
let city = document.querySelector(".weather__city");
let datetime = document.querySelector(".weather__datetime");

//convert country code to name
function convertCountryCode(country) {
  let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  return regionNames.of(country);
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
  console.log(weatherData);

  city.innerHTML = `${weatherData.name} , 
                    ${convertCountryCode(weatherData.sys.country)}`;
  datetime.innerHTML = "hi";
}

document.body.addEventListener("load", getWeather());
