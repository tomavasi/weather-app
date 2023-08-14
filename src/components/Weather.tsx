import { useContext } from "react"
import { ContextType, forecastType, CurrentWeatherType} from "../context/DataContext"
import { DataContext } from "../context/DataContext"
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
  const description = currentWeather.weather[0].description
  return (
    <div className="weather-container">
    <div className="currentWeather">
      <p className="cityname">
      {cityName}, {country}
      </p>
      <p className="temp">
        {currentTemp} ℃
      </p>
      <p>
      {description}
      </p>
      <p>
      L: {minTemp}° / H: {maxTemp}°
      </p>
    </div>
    <div className="forecast-panel">
        {forecast.list.map((item, i)=>
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