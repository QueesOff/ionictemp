import React, { useState, useEffect } from "react";
import axios from "axios";
import './Weather.css'
import {BsCloudSun, BsWind} from 'react-icons/bs'
import {MdOutlineWaterDrop} from 'react-icons/md'


interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  name: string;
  wind: {
    speed: number;
  };
}

const Weather: React.FC = () => {
  const [temperature, setTemperature] = useState<number | undefined>(undefined);
  const [desc, setDesc] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [humidity, setHumidity] = useState<number | undefined>(undefined);
  const [windSpeed, setWindSpeed] = useState<number | undefined>(undefined);

  useEffect(() => {
    getWeatherData('Bishkek');
  }, []);

  const getWeatherData = (city: string) => {
    axios
      .get<WeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?q=Bishkek&appid=e203317f0df5474c05874e35b030eda3`
      )
      .then((response) => {
        const data = response.data;
        setTemperature(Math.round(data.main.temp - 273.15));
        setDesc(data.weather[0].description);
        setName(data.name);
        setHumidity(data.main.humidity);
        setWindSpeed(data.wind.speed);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearch = () => {
    getWeatherData('Bishkek');
  };

  return (
    <div className="background" style={{ height: '90px' }}>
      <div className="container" >
        <div id="card" className="weather">
          <div className="details">
            <h1 className="temp">
              {temperature}
              <span>&deg;C</span>
            </h1>
            <div className="right">
              <div style={{ fontWeight: "bold", marginTop: "4px", fontSize: '14px' }}>{name}</div>
              <div id="summary" style={{ fontSize: '12px' }}>{desc}</div>
            </div>
          </div>
          <div className="info">
            <BsCloudSun style={{ fontSize: '40px', marginBottom: '10px' }}/>
            <div className="info2">
              <div className="info-item">
                <MdOutlineWaterDrop  style={{ fontSize: '16px' }} />
                <span className="info-value" style={{ fontSize: '12px' }}>{humidity}%</span>
              </div>
              <div className="info-item">
                <BsWind  style={{ fontSize: '16px' }} />
                <span className="info-value" style={{ fontSize: '12px' }}>{windSpeed} км/ч</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
