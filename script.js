document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherbtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");

  const API_KEY = "744be3a317700d344716d926364513cf"; //env variables
  getWeatherbtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return "";

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);
    console.log(response);
    console.log("RESPONSE", response);

    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    return data;
  }

  function displayWeatherData(data) {
    console.log(data);

    const { name, main, weather } = data;
    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `Temperatur : ${main.temp}`;
    descriptionDisplay.textContent = `Weather : ${weather[0].description}`;

    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  function showError() {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
