import * as React from "react";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { cityType } from "../context/DataContext";
import { ContextType } from "../context/DataContext";
import './search.css'
const Search = () => {

  const {term, onInputChange, options, setCityData, onTermSubmit } = useContext<ContextType>(DataContext);


  return (
    <div className="searchContainer">
      <div className="subtitle">
      <span>Weather</span><h2>Forecast</h2>
      </div>
      <br></br>
      <br></br>
        <p>
            Please enter the name of a city you want out of the list:
        </p>
    <div className="search">
        <input value={term} onChange={onInputChange}/>
        <ul className="searchlist">
       {term.length > 0 && options.map((city: cityType) =>
       <li  key={city.lat}>
      <button onClick= { ()=> {
        setCityData(city);
        }}> {city.name}, {city.country}
      </button>
      </li>)}
      </ul>
        <button onClick={onTermSubmit}>Search</button>
    </div>
    </div>
  )
}

export default Search