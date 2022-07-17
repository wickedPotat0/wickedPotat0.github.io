const API_KEY = "dfaf25649299cc726630fe60f6cf83db";

function success(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  console.log(url);
  fetch(url).then((response) =>
    response.json().then((data) => {
      const city = document.querySelector("#weather span:first-child");
      const temp = document.querySelector("#weather span:nth-child(2)");
      const weather = document.querySelector("#weather span:last-child");
      city.innerText = `현재위치: ${data.name}`;
      temp.innerText = `오늘의 온도: ${Math.ceil(data.main.temp - 273.15)}°C`;
      weather.innerText = `오늘의 날씨: ${data.weather[0].main}`;
    })
  );
}

function error() {
  console.log("Can't find you. No weather for you ㅠㅠ");
}

navigator.geolocation.getCurrentPosition(success, error);
