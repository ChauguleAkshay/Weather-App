 const apiKey = 'c0529c5c9b3d8ecea60593af9e2cbf44';

 
 async function fetchWeatherData(city) {
    try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
);

if(!response.ok){
    throw new Error ("Unable to find wwather data");
}
const data =await response.json();
updateWeatherUI(data);
    }catch(error){
        console.error(error);
    }
// console.log(data);
// console.log(data.main.temp);
// console.log(data.name);
 }
 const cityElement = document.querySelector(".city");
 const temperature = document.querySelector(".temp");
 const windSpeed = document.querySelector(".wind-speed");
 const humidity = document .querySelector('.humidity');
 const visibility = document.querySelector(".visibility-distance")
 const descriptionText= document.querySelector(".description-text");
 const date = document.querySelector(".date");
 const descriptionIcon = document.querySelector(".description i");


 function updateWeatherUI(data)
{
cityElement.textContent = data.name;
temperature.textContent = `${Math.round(data.main.temp)}°`;
humidity.textContent = `${Math.round(data.main.humidity)}`;
windSpeed.textContent = `${data.wind.speed} km/h`;
humidity.textContent = `${data.main.humidity}%`
visibility.textContent= `${data.visibility / 1000} km`;
descriptionText.textContent= data.weather[0].description;
const currentDate = new Date ();
date .textContent = currentDate.toDateString();
const weatherIconName = getweatherIconName(data.weather[0].main)
descriptionIcon.innerHTML= `<i class="material-icons">${weatherIconName}</i>`

} 

const formElement = document.querySelector(".search-form");
const inputElement = document.querySelector(".city-input");

formElement.addEventListener('submit',function(e){
    e.preventDefault();
    const city = inputElement.value;
    if(city!==''){
        fetchWeatherData(city);
        inputElement.value='';
    }
});

function getweatherIconName(weatherCondition){
    const iconMap = {
        Clear: "wb_sunny",
        Clouds: "wb_cloudy",
        Rain: "umbrella",
        Thunderstorm: "flash_on",
        Drizzle: "grain",
        Snow: "ac_unit",
        Mist: "cloud",
        Smoke: "cloud",
        Haze: "cloud",
        Fog: "cloud",
    };
    return iconMap[weatherCondition] || "help"
}


