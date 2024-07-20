function getWeather() {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=Turlock&appid=`${API_KEY}`"
  )
    .then((res) => res.json())
    .then((data) => console.log(data));
}

document.body.addEventListener("load", getWeather());
