import * as React from "react"
import { forecastType, CurrentWeatherType} from "../context/DataContext"
import "./weather.css"
type PropsType ={
  currentWeather: CurrentWeatherType
  forecast: forecastType
}
function Weather({currentWeather , forecast}:PropsType): JSX.Element{


  const cityName  = currentWeather.name
  const country = forecast.country
  const minTemp = Math.round(currentWeather.main.temp_min)
  const maxTemp = Math.round(currentWeather.main.temp_max)
  const currentTemp= Math.round(currentWeather.main.temp)
  // const description = currentWeather.weather[0].description
  const currentWeatherIcon = currentWeather.weather[0].icon
  const windSpeed = Math.round((currentWeather.wind.speed) * 3.6)
  const windDegree = currentWeather.wind.deg
  const humidity = currentWeather.main.humidity
  const feelsLike= Math.round(currentWeather.main.feels_like)

  const WindDegrees = ():JSX.Element =>{
    return (
    <>
   {windDegree == 0 && <p>N</p>}
   {windDegree > 0 && windDegree < 90 && <p>NE</p>}
   {windDegree == 90 && <p>E</p>}
   {windDegree > 90 && windDegree < 180 && <p>SE</p>}
   {windDegree == 180 && <p>S</p>}
   {windDegree > 180 && windDegree < 270 && <p>SW</p>}
   {windDegree == 270 && <p>W</p>}
   {windDegree > 270 && <p>NW</p>}
    </>)
  }
  return (
    <div className="weather-container">
    <div className="currentWeather">
    <p>
      <img src={`http://openweathermap.org/img/wn/${currentWeatherIcon}.png`}/>
      </p>
      <p className="temp">
        {currentTemp} ℃
      </p>
      <p className="cityname">
      {cityName}, {country}
      </p>
      <p>
      L: {minTemp}° / H: {maxTemp}°
      </p>
    </div>
    <div className="weatherInfo">
    <div className="wind">
      <p>
        Wind
      </p>
      <p className="windInfo">
      <WindDegrees/> {windSpeed} Km/h
      </p>
    </div>
    <div className="humidity">
      <p>
        Humidity
      </p>
      <p>
      {humidity} %
      </p>
    </div>
    <div className="feelsLike">
      <p>
        Feels like
      </p>
      <p>
      {feelsLike} ℃
      </p>
    </div>
    </div>
    <div className="forecast-panel">
        {forecast.list.map((item)=>
        <div className="forecast" key={item.dt}>
          <p className="dt">
            {new Date(item.dt*1000).getHours()}
          </p>
          <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}/>
          <p>
            {Math.round(item.main.temp)}°
          </p>
        </div>
        )}
    </div>
    </div>)
}
export default Weather