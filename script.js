document.addEventListener('DOMContentLoaded', function () {
    // Your existing JavaScript code here

    const apiKey = "30a59e5e306b687598b92cacd75cc380";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

    const searchBox = document.querySelector(".search input");
    const searchForm = document.querySelector(".search");

    const weatherIcon = document.querySelector(".weather-icon img");

    async function checkWeather(city){
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        const err = document.querySelector(".error");
        const weather = document.querySelector(".weather");
        if(response.status == 404){
            err.innerHTML = "<h2>city \"" + city + "\" not found !</h2>";
            err.style.height = "max-content";
            weather.style.height = "0";
        }
        else{
            weather.style.height = "max-content";
            err.style.height = "0";
        }

        var data = await response.json();

        console.log(data);
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        switch(data.weather[0].main){
            case 'Clouds':
                weatherIcon.src = "imgs/cloudy.png";
                break;
            case 'Clear':
                weatherIcon.src = "imgs/clear.png";
                break;
            case 'Rain':
                weatherIcon.src = "imgs/rain.png";
                break;
            case 'Drizzle':
                weatherIcon.src = "imgs/drizzle.png";
                break;
            case 'Mist':
                weatherIcon.src = "imgs/mist.png";
                break;
            case 'Snowy':
                weatherIcon.src = "imgs/snowy.png";
                break;
            case 'Haze':
                weatherIcon.src = "imgs/haze.png";
                break;
            default:
                weatherIcon.src = "";
        }
    }

    // searchForm.addEventListener("submit", () => {
    //     var city = searchForm.querySelector('input').value;
    //     checkWeather(city);
    // })
    searchForm.addEventListener("submit", async (event) => {
       // event.preventDefault(); // Prevent the default form submission behavior

        var city = searchForm.querySelector('input').value.trim();
        await checkWeather(city);
    });


});
