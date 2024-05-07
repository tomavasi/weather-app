import * as React from "react";
import { createContext, useState, ChangeEvent, ReactElement, useEffect } from "react";
import { useAxios} from "../hooks/useAxios";
import axios from "axios";


export type cityType = {
    country: string,
    lat: number ,
    lon: number ,
    name: string
  }

export type forecastType = {
   name:string,
    country: string,
    sunrise: number,
    sunset: number,
    list: [
      {
      dt:number,
      main:{
        feels_like: number,
        humidity:number,
        temp: number,
        temp_max :number,
        temp_min:number
      },
      weather:[
        {
        main:string,
        icon:string
        description: string
      }
    ],
    wind: {
      speed:number,
      gust:number,
      deg:number
    },
    clouds:{
      all:number
    },
    pop: number,
    visibility: number
  }
    ]
  }
export type CurrentWeatherType = {
  main:{
    feels_like: number,
    humidity:number,
    temp: number,
    temp_max :number,
    temp_min:number
  }
  name: string
  weather:[
    {
    main:string,
    icon:string
    description: string
  }
]
}
type ChildernType = {children: ReactElement | ReactElement []}
export type ContextType = {
  term: string,
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void | null,
  setCityData:  React.Dispatch<React.SetStateAction<cityType | null>>
  setTerm: React.Dispatch<React.SetStateAction<string>>
  forecast: forecastType | null
  currentWeather: CurrentWeatherType| null
  onTermSubmit: () => void | null
  cityData: cityType | null
  options: []
  setOptions: React.Dispatch<React.SetStateAction<[]>>
 
}


const initialStateContext:ContextType = {
  term: "",
  onInputChange: () => {},
  setCityData: () => {},
  setTerm: () => {},
  forecast: null,
  currentWeather: null,
  onTermSubmit: () => {},
  cityData: null,
  options: [],
  setOptions: () => {}
}

export const DataContext = createContext(initialStateContext);

export const DataContextProvider = ({children}:ChildernType) =>{
      const [term,setTerm] = useState("")
      const [cityData,setCityData] = useState<cityType | null>( null)
      const [forecast,setForecast] = useState<forecastType | null>(null)
      const [options, setOptions] = useState<[]>([])
      const [currentWeather,setCurrentWeather] = useState<CurrentWeatherType | null>(null)

      // const [forecast,setForecast] = useState<forecastType | null>(null)
      const geoData = useAxios(`http://api.openweathermap.org/geo/1.0/direct?q=${term}&limit=10&appid=${import.meta.env.VITE_API_KEY}`).data
      const onInputChange = (e : ChangeEvent<HTMLInputElement>) =>{
        setTerm(e.target.value)
        // console.log(geoData.data)
        setOptions(geoData)
      }
      const onTermSubmit = () => {
        if (cityData) {
        getCurrentWeather(cityData)
        getForecast(cityData)}

      }
    const getForecast = (data:cityType) => {
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${data.lat}&lon=${data.lon}&units=metric&appid=${import.meta.env.VITE_API_KEY}`).
        then(response=> {
          const forecastData: forecastType =
          { ...response.data.city,
           list: response.data.list.slice(0,16)}
          setForecast(forecastData)
          ;
        })

      }
    const getCurrentWeather = (data:cityType) =>{
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&units=metric&appid=26fc269eeca753fde23dfbcc185c7c69`).
      then(response=> {
        setCurrentWeather(response.data);
      });
    }
    useEffect(()=>{
      if (cityData){
        setTerm(cityData.name)
        setOptions([])
      }
    },[cityData])

      const contextValue = {term , setTerm, cityData, setCityData, onInputChange, forecast, currentWeather, onTermSubmit,options,setOptions}
return (<DataContext.Provider value={contextValue}>{children}</DataContext.Provider>)
}
