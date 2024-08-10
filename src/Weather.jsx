import React, { useState } from "react";
import './weather.css'
const api = {
  key: "05c3721f0137d6d3e46c73952879d144",
  base: "https://api.openweathermap.org/data/2.5/",
};

const Weather = () => {
  const [query, setquery] = useState("");
  const [weather, setweather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}
            &units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setweather(result);
          setquery("");
          console.log(result);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year} `;
  };
  return (
    
    //  <div className={(typeof weather.main != 'undefined')  
    //  ?((weather.main.temp>19)?'app-warm' : 'app'): 'app'}> 
    <div className={
        (typeof weather.main != 'undefined' && typeof weather.weather[0].main != 'undefined') ? 
            ((weather.main.temp > 20) ? 'app-warm' : 'app') + 
            ((weather.weather[0].main === 'Drizzlenp') ? ' rain' : '') : 
            'app'
    }>
    
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            value={query}
            onChange={(e) => setquery(e.target.value)}
            onKeyPress={search}
          ></input>
        </div> 
        {(typeof weather.main !="undefined")?(<div>
        <div className="location-box">
          <div className="location">
            {weather.name},{weather.sys.country}
          </div>
          <div className="date">
            {dateBuilder(new Date())}
          </div>
        </div>
        <div className="weather-box">
            <div className="temp">
                {Math.round(weather.main.temp)}°C 
            </div>
            <div className="weather">
                {weather.weather[0].main}
                {/* {weather.main.humidity} */}
            </div>
            <div className="others">
                Feels-like: {weather.main.feels_like}°C<br/>
              Humidity:  {weather.main.humidity}

              {console.log(weather.weather[0].main)}

            </div>
        </div>
        </div>

        ):(' ')}
        
      </main> 
    </div>
  );
};

export default Weather;
