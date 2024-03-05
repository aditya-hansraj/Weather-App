document.addEventListener('DOMContentLoaded', function () {

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
        document.title = data.name;
        printTemp(Math.round(data.main.temp));
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
        
        var title_icon = document.getElementById("title-icon");

        switch(data.weather[0].main){
            case 'Clouds':
                weatherIcon.src = "imgs/cloudy.png";
                weatherIcon.src = "imgs/cloudy.png";
                break;
            case 'Clear':
                weatherIcon.src = "imgs/clear.png";
                title_icon.href = "imgs/clear.png";
                break;
            case 'Rain':
                weatherIcon.src = "imgs/rain.png";
                title_icon.href = "imgs/rain.png";
                break;
            case 'Drizzle':
                weatherIcon.src = "imgs/drizzle.png";
                title_icon.href = "imgs/drizzle.png";
                break;
            case 'Mist':
                weatherIcon.src = "imgs/mist.png";
                title_icon.href = "imgs/mist.png";
                break;
            case 'Snowy':
                weatherIcon.src = "imgs/snowy.png";
                title_icon.href = "imgs/snowy.png";
                break;
            case 'Haze':
                weatherIcon.src = "imgs/haze.png";
                title_icon.href = "imgs/haze.png";
                break;
            case 'Smoke':
                weatherIcon.src = "imgs/smoke.png";
                title_icon.href = "imgs/smoke.png";
                break;
            default:
                weatherIcon.src = "";
        }
    }

    function printTemp(temp){
        document.querySelector(".temp .primary").innerHTML = temp;
        document.querySelector("#pri").innerHTML = "°C";
        document.querySelector("#sec").innerHTML = "F";
        c = true;
    }

    searchForm.addEventListener("submit", async (event) => {
        var city = searchForm.querySelector('input').value.trim();
        await checkWeather(city);
    });

    var c= true;

    document.querySelector("#switch").addEventListener("click", () => {
        var temp = document.querySelector(".primary").innerHTML;
        if(c){
            document.querySelector(".temp .primary").innerText = toFahrenheit(temp);
            document.querySelector("#pri").innerText = "F";
            document.querySelector("#sec").innerText = "°C";
            c = !c;
        }  
        else{
            document.querySelector(".temp .primary").innerText = toCelsius(temp);
            document.querySelector("#pri").innerHTML = "°C";
            document.querySelector("#sec").innerHTML = "F";
            c = !c;
        }
    });

    function toFahrenheit(celsius) {
        return Math.round((celsius * 9/5) + 32);
    }

      function toCelsius(fahrenheit) {
        return Math.round((fahrenheit - 32) * 5/9);
    }


});
