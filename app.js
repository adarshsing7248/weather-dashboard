let btn=document.querySelector("button");
let inp=document.querySelector("#cityInput");
let div=document.querySelector("#WeatherResult");
let mainTemperature = document.querySelector(".mainTemperature");
let weatherCondition = document.querySelector(".Weathercondition");
let temperatureCard = document.querySelector(".temperatureCard");
let precipitationCard = document.querySelector(".precipitationCard");
let humidityCard = document.querySelector(".humidityCard");
let conditionCard = document.querySelector(".conditionCard");
let hourlyForecast = document.querySelector(".hourlyForecast");
let weatherImage = document.querySelector(".WeatherImage");
let locationBtn = document.querySelector("#locationBtn");
let sunriseDiv = document.querySelector(".sunrise");
let sunsetDiv = document.querySelector(".sunset");

inp.addEventListener("keydown",function(event){
    if(event.key==="Enter"){
        btn.click();
    }
});
btn.addEventListener("click",function(){
    let result2=inp.value;
    
if(inp.value==""){mainTemperature.innerText="Please enter a city name.";}    
else{mainTemperature.innerText = "Loading...";
        

        let url=`https://geocoding-api.open-meteo.com/v1/search?name=${result2}`;
        fetch(url)
        .then((result)=>{
            console.log(result);
            return result.json();
        })
        .then((data)=>{ 
            if(data.results && data.results.length>0){
                let lat= data.results[0].latitude;
            let long= data.results[0].longitude;
            console.log(lat,long);
         let url2=`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m,weather_code,precipitation&hourly=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code,sunrise,sunset&forecast_days=10&timezone=auto`;
            fetch(url2)
            .then((response)=>{console.log(response);
                return response.json();
            })
            .then((data)=>{ let temp=data.current.temperature_2m;
                let humidity=data.current.relative_humidity_2m;
                let weather_code=data.current.weather_code;
                let precipitation = data.current.precipitation;
                let daily = data.daily;
                let sunrise = daily.sunrise[0];
                let sunset = daily.sunset[0];
                let sunriseTime = sunrise.split("T")[1];
let sunsetTime = sunset.split("T")[1];

sunriseTime = sunriseTime.slice(0,5);
sunsetTime = sunsetTime.slice(0,5);

                sunriseDiv.innerText = `🌅 Sunrise\n${sunriseTime}`;
                sunsetDiv.innerText = `🌇 Sunset\n${sunsetTime}`;
           
           
                console.log("Sunrise:", sunrise);
                console.log("Sunset:", sunset);
                let tenDayForecast = document.querySelector(".tenDayForecast");
                

tenDayForecast.innerHTML = "";

for(let i = 0; i < daily.time.length; i++){

    let card = document.createElement("div");

    let date = new Date(daily.time[i]).toLocaleDateString([], {
        weekday: "short"
    });

    let maxTemp = daily.temperature_2m_max[i];
    let minTemp = daily.temperature_2m_min[i];
    let code = daily.weather_code[i];

let icon = "";

if(code == 0){
    icon = "☀️";
}
else if(code == 1 || code == 2){
    icon = "⛅";
}
else if(code == 3){
    icon = "☁️";
}
else if(code >= 51 && code <= 67){
    icon = "🌧️";
}
else if(code >= 71 && code <= 77){
    icon = "❄️";
}
else if(code >= 80 && code <= 82){
    icon = "🌦️";
}
else if(code == 85 || code == 86){
    icon = "🌨️";
}
else if(code >= 95 && code <= 99){
    icon = "⛈️";
}
else{
    icon = "🌤️";
}

   card.innerText = `${date}\n${icon}\n${maxTemp}° / ${minTemp}°`;

    tenDayForecast.appendChild(card);
}
                console.log(data.hourly);
                let hourly = data.hourly;
                console.log("Hourly data:", hourly);
                hourlyForecast.innerHTML = "";
                for(let i=0; i<6; i++){
    let card = document.createElement("div");

    let time = new Date(hourly.time[i]).toLocaleTimeString([], {
    hour: "numeric",
    hour12: true
});
    let temp = hourly.temperature_2m[i];
    let code = hourly.weather_code[i];

    let icon = "";

    if(code == 0){
        icon = "☀️";
    }
    else if(code == 1 || code == 2){
        icon = "⛅";
    }
    else if(code == 3){
        icon = "☁️";
    }
    else if(code >= 51 && code <= 67){
        icon = "🌧️";
    }
    else if(code >= 71 && code <= 77){
        icon = "❄️";
    }
    else if(code >= 80 && code <= 82){
        icon = "🌦️";
    }
    else if(code == 85 || code == 86){
        icon = "🌨️";
    }
    else if(code >= 95 && code <= 99){
        icon = "⛈️";
         }
    else{
        icon = "🌤️";
    }

   card.innerText = `${time}\n${icon}\n${temp}°C`;

    hourlyForecast.appendChild(card);
}
   console.log(weather_code);
               let weathercondition="";
                if(weather_code==0){weathercondition="Clear Sky";}
                else if(weather_code==1){weathercondition="Cloudy";}
                else if(weather_code==2){weathercondition="Partly Cloudy";}
                else if(weather_code==3){weathercondition="Overcast";}
                else if(weather_code==61||weather_code==63||weather_code==65){weathercondition="Rain";}
                else if(weather_code==66||weather_code==67){weathercondition="Freezing Rain";}

                else if(weather_code==51||weather_code==53||weather_code==55){weathercondition="Drizzle";}
                else if(weather_code==56||weather_code==57){weathercondition="Freezing Drizzle";}

                else if(weather_code==71||weather_code==73||weather_code==75){weathercondition="Snow";}
                else if(weather_code==77){weathercondition="Snow Grains";}

                else if(weather_code==80||weather_code==81||weather_code==82){weathercondition="Rain Showers";}
                else if(weather_code==86||weather_code==85){weathercondition="Snow Showers";}
                else if(weather_code==95){weathercondition="Thunderstorm";}
                else if(weather_code==96||weather_code==99){weathercondition="Thunderstorm with Hail";}
                else{weathercondition="Unknown"}
                if(weathercondition === "Clear Sky"){
    weatherImage.innerText = "☀️";
}
else if(weathercondition === "Partly Cloudy"){
    weatherImage.innerText = "⛅";
}
else if(weathercondition === "Overcast"){
    weatherImage.innerText = "☁️";
}
else if(weathercondition === "Rain" || weathercondition === "Rain Showers"){
    weatherImage.innerText = "🌧️";
}
else if(weathercondition === "Snow" || weathercondition === "Snow Showers"){
    weatherImage.innerText = "❄️";
}
else if(weathercondition === "Thunderstorm" || weathercondition === "Thunderstorm with Hail"){
    weatherImage.innerText = "⛈️";
}
else{
    weatherImage.innerText = "🌤️";
}


                console.log(weathercondition);
                mainTemperature.innerText = `${temp}°C`;
                weatherCondition.innerText = weathercondition;

                temperatureCard.innerText = `${temp}°C\nTemperature`;
                humidityCard.innerText = `${humidity}%\nHumidity`;
                conditionCard.innerText = `${weathercondition}\nWeather Condition`;
                precipitationCard.innerText = `${precipitation} mm\nPrecipitation`;
                inp.value=""
            })
        }else{console.log("city not found");
              mainTemperature.innerText="Please Enter A Valid City";        }
        }).catch((err)=>{mainTemperature.innerText="Something went wrong. Please try again.";})
    
}}
)
     locationBtn.addEventListener("click", function(){

    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(function(position){

            let lat = position.coords.latitude;
            let long = position.coords.longitude;

            console.log(lat, long);
let locationUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m,weather_code,precipitation&hourly=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code,sunrise,sunset&forecast_days=10&timezone=auto`;
fetch(locationUrl)
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        console.log(data);
        console.log(data.current);
console.log(data.daily);
        let temp = data.current.temperature_2m;
let humidity = data.current.relative_humidity_2m;
let precipitation = data.current.precipitation;
let weather_code = data.current.weather_code;
let tenDayForecast = document.querySelector(".tenDayForecast");
let daily = data.daily;

let sunrise = daily.sunrise[0];
let sunset = daily.sunset[0];

let sunriseTime = sunrise.split("T")[1].slice(0,5);
let sunsetTime = sunset.split("T")[1].slice(0,5);

sunriseDiv.innerText = `🌅 Sunrise\n${sunriseTime}`;
sunsetDiv.innerText = `🌇 Sunset\n${sunsetTime}`;
let weathercondition = "";

if(weather_code == 0){
    weathercondition = "Clear Sky";
}
else if(weather_code == 1){
    weathercondition = "Cloudy";
}
else if(weather_code == 2){
    weathercondition = "Partly Cloudy";
}
else if(weather_code == 3){
    weathercondition = "Overcast";
}
else if(weather_code == 61 || weather_code == 63 || weather_code == 65){
    weathercondition = "Rain";
}
else if(weather_code == 51 || weather_code == 53 || weather_code == 55){
    weathercondition = "Drizzle";
}
else if(weather_code == 71 || weather_code == 73 || weather_code == 75){
    weathercondition = "Snow";
}
else if(weather_code == 80 || weather_code == 81 || weather_code == 82){
    weathercondition = "Rain Showers";
}
else if(weather_code == 85 || weather_code == 86){
    weathercondition = "Snow Showers";
}
else if(weather_code == 95){
    weathercondition = "Thunderstorm";
}
else if(weather_code == 96 || weather_code == 99){
    weathercondition = "Thunderstorm with Hail";
}
else{
    weathercondition = "Unknown";
}
let hourly = data.hourly;

hourlyForecast.innerHTML = "";

for(let i = 0; i < 6; i++){

    let card = document.createElement("div");

    let time = new Date(hourly.time[i]).toLocaleTimeString([], {
        hour: "numeric",
        hour12: true
    });

    let hourlyTemp = hourly.temperature_2m[i];
    let code = hourly.weather_code[i];

    let icon = "";

    if(code == 0){
        icon = "☀️";
    }
    else if(code == 1 || code == 2){
        icon = "⛅";
    }
    else if(code == 3){
        icon = "☁️";
    }
    else if(code >= 51 && code <= 67){
        icon = "🌧️";
    }
    else if(code >= 71 && code <= 77){
        icon = "❄️";
    }
    else if(code >= 80 && code <= 82){
        icon = "🌦️";
    }
    else if(code == 85 || code == 86){
        icon = "🌨️";
    }
    else if(code >= 95 && code <= 99){
        icon = "⛈️";
    }
    else{
        icon = "🌤️";
    }

  card.innerText = `${time}\n${icon}\n${hourlyTemp}°C`;

    hourlyForecast.appendChild(card);
}
let dailyForecast = data.daily;

tenDayForecast.innerHTML = "";

for(let i = 0; i < dailyForecast.time.length; i++){

    let card = document.createElement("div");

    let date = new Date(dailyForecast.time[i]).toLocaleDateString([], {
        weekday: "short"
    });

    let maxTemp = dailyForecast.temperature_2m_max[i];
let minTemp = dailyForecast.temperature_2m_min[i];
let code = dailyForecast.weather_code[i];

let icon = "";

if(code == 0){
    icon = "☀️";
}
else if(code == 1 || code == 2){
    icon = "⛅";
}
else if(code == 3){
    icon = "☁️";
}
else if(code >= 51 && code <= 67){
    icon = "🌧️";
}
else if(code >= 71 && code <= 77){
    icon = "❄️";
}
else if(code >= 80 && code <= 82){
    icon = "🌦️";
}
else if(code == 85 || code == 86){
    icon = "🌨️";
}
else if(code >= 95 && code <= 99){
    icon = "⛈️";
}
else{
    icon = "🌤️";
}

card.innerText = `${date}\n${icon}\n${maxTemp}° / ${minTemp}°`;

    tenDayForecast.appendChild(card);
}

mainTemperature.innerText = `${temp}°C`;
temperatureCard.innerText = `${temp}°C\nTemperature`;
precipitationCard.innerText = `${precipitation} mm\nPrecipitation`;
humidityCard.innerText = `${humidity}%\nHumidity`;
conditionCard.innerText = `${weathercondition}\nWeather Condition`;
    });

        });

    }
    else{
        alert("Geolocation is not supported by your browser.");
    }

});


let homeLink = document.querySelector("#homeLink");
let aboutLink = document.querySelector("#aboutLink");

let weatherPage = document.querySelector("#WeatherResult");
let aboutSection = document.querySelector("#aboutSection");

aboutLink.addEventListener("click", function(event){
    event.preventDefault();

    weatherPage.style.display = "none";
    aboutSection.style.display = "block";
});

homeLink.addEventListener("click", function(event){
    event.preventDefault();

    aboutSection.style.display = "none";
    weatherPage.style.display = "block";
});
