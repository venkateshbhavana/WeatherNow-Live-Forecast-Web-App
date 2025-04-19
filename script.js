async function getWeather() {
	const city = document.getElementById("cityInput").value;
	const resultDiv = document.getElementById("weatherResult");
  
	if (!city) {
	  alert("Please enter a city name");
	  return;
	}
  
	const apiKey = "f00c38e0279b7bc85480c3fe775d518c"; // Replace with your actual OpenWeatherMap API key
	const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
	try {
	  const response = await fetch(apiUrl);
	  const data = await response.json();
  
	  if (data.cod !== 200) {
		alert("City not found");
		return;
	  }
  
	  document.getElementById("cityName").textContent = data.name;
	  document.getElementById("datetime").textContent = new Date().toLocaleString();
	  document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°C`;
	  document.getElementById("description").textContent = data.weather[0].description;
	  document.getElementById("windSpeed").textContent = `Wind Speed: ${data.wind.speed} m/s`;
  
	  const icon = data.weather[0].icon;
	  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
	  const iconImg = document.getElementById("weatherIcon");
	  iconImg.src = iconUrl;
	  iconImg.onerror = () => {
		iconImg.src = "fallback.png"; // custom fallback image
	  };
  
	  resultDiv.classList.remove("hidden");
	} catch (error) {
	  console.error("Error fetching weather:", error);
	  alert("Something went wrong. Please try again.");
	}
  }
  