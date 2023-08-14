import { useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import { cityType } from "../context/DataContext";
import { ContextType } from "../context/DataContext";
import './search.css'
const Search = () => {

  const {term, onInputChange, options, setCityData, onTermSubmit } = useContext<ContextType>(DataContext);

  
  return (
    <div>
        <p>
            Please enter the location you want to know the weather for
        </p>
        <input value={term} onChange={onInputChange}/>
        <button onClick={onTermSubmit}>Search</button>
       {term.length > 0 && options.map((city: cityType) =>
       <ul key={city.lat}>
       <li>
      <button onClick= { ()=> {
        setCityData(city);
        }}> {city.name}, {city.country}
      </button>
      </li>
      </ul>)
      }
    </div>
  )
}

export default Search