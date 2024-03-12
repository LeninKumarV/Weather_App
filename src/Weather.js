import React, { useEffect, useState } from "react";
import search from "./images/search-interface-symbol.png";
import "./Weather.css";
import sun from "./images/sun-9658.png";
import cloud from "./images/weather1.png";
import fog from "./images/snow.png";
import rain from './images/rain.png';
import hum from "./images/weather.png";
import wind from "./images/fresh-air.png";
import axios from "axios";

function Weather() {
  const [image, setImage] = useState(sun);
  const [degree, setDegree] = useState("32c");
  const [city, setCity] = useState("erode");
  const [lat, setLat] = useState(8.772);
  const [long, setLong] = useState(78.5653);
  const [humidity, setHum] = useState("55%");
  const [windspeed, setWind] = useState("2.57km/h");
  const [country, setCountry] = useState("");
  let data;

  const API_KEY = "90d34278d504e81ddde3b3d5ed2cce4c";
  // const URL='https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}';

  const handleData = async () => {
    try {
      const response = await axios(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      const result = response.data;
      console.log(result)
      setCountry(result.sys.country);
      setDegree(Math.floor(result.clouds.all));
      setLat(result.coord.lat);
      setLong(result.coord.lon);
      setWind(result.wind.speed);
      setHum(result.main.humidity);
    
      const weatherIconCode=result.weather[0].icon;
      if(weatherIconCode){
        setImage(weatherConditions[weatherIconCode]);
      }

    } catch (err) {
      console.log(err.message);
    }
  };

  const handleText = (e) => {
    data = e.target.value;
    data.trim().toLowerCase()
  };
  const handleSearch = () => {
    setCity(data);
    handleData();
  };

  const handleKeyDown=(e)=>{
    if(e.key==='Enter'){
      setCity(data);
      handleData();
    }
  }

  const weatherConditions={
      '01d': sun,
      '01n':sun,
      '02d':sun,
      '02n':sun,
      '03d':cloud,
      '03n':cloud,
      '04d':cloud,
      '04n':cloud,
      '09d':rain,
      '09n':rain,
      '10d':rain,
      '10n':rain,
      '13d':fog,
      '13n':fog,
    }

  useEffect(() => {
    handleData();
  }, []);

  return (
    <div className="weather">
      <div className="search">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search here.."
          onChange={(e) => handleText(e)}
          onKeyDown={(e)=>handleKeyDown(e)}
        />
        <img src={search} id="searchIcon" onClick={handleSearch} />
      </div>

      <img src={image} className="sun" />
      <h1 className="degree">{degree}°C</h1>
      <h1 className="city" style={{color:"orange"}}>{city}</h1>
      <p>{country}</p>

      <div className="no">
        <div className="lat">
          <p>latitude</p>
          <p>{lat}</p>
        </div>

        <div className="long">
          <p>longitude</p>
          <p>{long}</p>
        </div>
      </div>

      <div className="bottom">
        <div className="humidity">
          <img src={hum}></img>
          <h4>{humidity}%</h4>
          <p>Humidity</p>
        </div>

        <div className="wind">
          <img src={wind} />
          <h4>{windspeed}km/h</h4>
          <p>Wind Speed</p>
        </div>
      </div>

      <p>Designed by Lenin</p>
    </div>
  );
}

export default Weather;
