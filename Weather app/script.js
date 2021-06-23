const searchBtn = document.getElementById("search-btn");
const searchTerm = document.getElementById("search-term");
const city_name = document.getElementById("city-name");
const daysList = document.getElementById("body");
const apiID = "8c421ea7e698251fad223c8c77b03cdb";
const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const error = document.getElementById("error");
let ERROR = false;
//now:
/*
	fetch data
	min/max of the day and icon at 12?

*/

//later:
showWeather("Athens");

async function showWeather(cityName) {
  // let term = "athens";
  try {
    const resp = await fetch(
      "http://api.openweathermap.org/data/2.5/forecast?q=" +
        cityName +
        "&appid=" +
        apiID +
        "&units=metric"
    );
    const weatherData = await resp.json();

    //! Error handling wront city requests
    console.log(weatherData.cod);
    if (weatherData.cod == 404) {
      if (!ERROR) {
        ERROR = true;
        error.classList.toggle("hidden");
      }
      // return;
    } else {
      if (ERROR) error.classList.toggle("hidden");
    }

    displayCityName(weatherData.city.name, weatherData.city.country);
    clearList();
    handleData(weatherData.list);
  } catch (err) {
    console.error(err);
  }
}

function handleData(data) {
  var date = new Date();
  day = date.getDay();

  let j = 0;
  for (let i = 1; i <= 5; i++) {
    let min = data[j].main.temp_min;
    let max = data[j].main.temp_max;
    let icon = data[j].weather[0].icon;

    // end of each day in unix time
    date.setHours(24, 0, 0, 0);
    const EOD = date.getTime() / 1000;

    while (data[j].dt <= EOD) {
      if (data[j].main.temp_min < min) {
        min = data[j].main.temp_min;
      }
      if (data[j].main.temp_max > max) {
        max = data[j].main.temp_max;
        icon = data[j].weather[0].icon;
      }
      j++;
    }

    if (day >= 7) day = 0;
    addDay(weekDays[day], Math.round(min), Math.round(max), icon);
    day++;
  }
}

function addDay(day, min_temp, max_temp, icon) {
  const dayEl = document.createElement("div");
  dayEl.classList.add("day");
  dayEl.innerHTML = `<h3>${day}</h4>
	<div class="temp">
	<span>${max_temp}/${min_temp} C</span>
	<img
	class="icon"
	src="http://openweathermap.org/img/wn/${icon}@2x.png"
	alt="smth"
	/>
	</div>
	`;

  daysList.appendChild(dayEl);
}

function displayCityName(cityName, country) {
  city_name.innerHTML = `${cityName} (${country})`;
}

function clearList() {
  daysList.innerHTML = "";
}

searchBtn.addEventListener("click", () => {
  showWeather(searchTerm.value);
  searchTerm.value = "";
});

searchTerm.addEventListener("keyup", (event) => {
  if (event.code == "Enter") {
    showWeather(searchTerm.value);
    searchTerm.value = "";
  }
});
