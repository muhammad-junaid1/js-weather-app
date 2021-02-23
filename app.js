window.addEventListener("load", () => {
  let lat;
  let long;
  const detailsSection = document.querySelector(".details");
  const iconElem = document.querySelector(".weather-icon");
  const descriptionElem = document.querySelector(".weather-description");
  const locationElem = document.querySelector(".weather-location");
  const windElem = document.querySelector(".wind");
  const temperatureElem = document.querySelector(".temperature");
  const humidityElem = document.querySelector(".humidity");
  const locationInput = document.querySelector(".location-input");
  const loadingOverlay = document.querySelector(".loading-overlay");

  function fetchAndShow(api) {
    loadingOverlay.style.display = "block";
    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod == "404") {
          detailsSection.innerHTML =
            "<h1 style='color: snow'>Invalid Keywords!</h1>";
          loadingOverlay.style.display = "none";
        } else {
          loadingOverlay.style.display = "none";
          const { description, icon } = data.weather[0];
          const { humidity, temp } = data.main;
          const windSpeed = data.wind.speed;
          const locationName = data.name;

          iconElem.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
          descriptionElem.textContent = description;
          locationElem.textContent = "( " + locationName + " )";
          windElem.textContent = windSpeed;
          temperatureElem.textContent = Math.floor(temp);
          humidityElem.textContent = humidity;
        }
      })
      .catch((error) => console.log(error));
  }

  const urlParams = new URLSearchParams(window.location.search);
  if (!urlParams.has("location")) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=8316100d7a5070cce73a2771a672b2f3&units=metric`;
        fetchAndShow(api);
      });
    }
  } else {
    const location = urlParams.get("location");
    locationInput.value = location;
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=8316100d7a5070cce73a2771a672b2f3&units=metric`;
    fetchAndShow(api);
  }
});
