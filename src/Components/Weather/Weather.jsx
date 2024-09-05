import React, { useState, useEffect } from 'react';
import sky from '../Assets/CSky.png'
import night from '../Assets/NSky.png'
function Weather({ search,handleData }) {
// First assign Data Object and Error Object --> Step 1
const [data, setData] = useState(null);
const [error, setError] = useState(null);
// Select a City as Input State --> Step 2
const [city, setCity] = useState("");
// Since for each change in Input the Component will re render  as the data is coming form outside .
// So we will use useEffect Hook to fetch the data from API only once when the component mounts.
useEffect(() => {
    if(!search){
        return;
    }
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const apiKey = "0c1befbf0545cb008044679c9ece5c91";
// Change this to any city you want
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
fetch(url)
    .then((response) => {
        // if Response is not OK throw Error 
    if (!response.ok) {
        console.log("NETWORK ERROR");
    }
        // Otherwise return Response to JSON format by .json()
    return response.json();
    })
    .then((data) => {
        setData(data);
        setError(null);
        // Call handleData with the fetched data
        if (data.main && data.weather) {
          handleData({
            city: city,
            temperature: data.main.temp,
            feels_like: data.main.feels_like,
            humidity: data.main.humidity,
            description: data.weather[0].description,
            max_temp: data.main.temp_max,
            min_temp: data.main.temp_min,
            pressure: data.main.pressure,
            speed: data.wind.speed
          });
        }
      })
    .catch((error) => {
    setError(error.message);
    console.error("Fetch Error", error);
    });
    return ()=>{
        // Cleanup function to prevent memory leaks
    }
}, [city]);

useEffect(() => {
setCity(search);
return ()=>{
    // Cleanup function to prevent memory leaks
}
}, [search]);

return (
<div className="WeatherDiv mt-[18px] text-[13px] md:text-[19px]">

    {city ? <p className='mt-[15px] font-bold uppercase'>{city}</p> : null}
    <div>
    {data ? (
        data.main && data.weather ? ( // Double-check that data.main and data.weather exist
        <div>
            <h2>Weather Data</h2>
            <div className='flex justify-center items-center'>
            <img 
            className='w-[150px] mb-[10px]'
            src={(data.weather[0].icon !== "01d" && data.weather[0].icon !== "01n") ? `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` : ((data.weather[0].icon==="01d"?sky:night))}
            alt={data.weather[0].description} 
            /></div>
            <p className='weatherDetails'>Weather 🌥️: <span>{data.weather[0].description}</span></p>
            <p className='weatherDetails'>Temperature 🌡️: <span>{data.main.temp} Celsius</span></p>
            <p className='weatherDetails'>Feels Like 🤔: <span>{data.main.feels_like} Celsius</span></p>
            <p className='weatherDetails'>Maximum Temperature 🔥: <span>{data.main.temp_max} Celsius</span></p>
            <p className='weatherDetails'>Minimum Temperature ❄️: <span>{data.main.temp_min} Celsius</span></p>
            <p className='weatherDetails'>Pressure 📏: <span>{data.main.pressure} hPa</span></p>
            <p className='weatherDetails'>Humidity 💧: <span>{data.main.humidity}%</span></p>
            <p className='weatherDetails'>Wind Speed 🌬️: <span>{data.wind.speed} m/s</span></p>
        </div>
        ) : (
        <>
            <p>Data is not complete.</p>
            <p>Enter your City </p>
        </>
        )
    ) : (
        !error && <>
        <p>Data is not complete.</p>
        <p>Enter your City </p>
        </>
    )}
    </div>
</div>
);
}

export default Weather;