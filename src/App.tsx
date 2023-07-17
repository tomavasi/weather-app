import Search from "./components/Search"
import  './App.css'
import Weather from "./components/Weather"
import { useContext, useEffect, useState } from "react"
import { DataContext } from "./context/DataContext"
// import SpotifyLogin from "./components/SpotifyLogin"
import Spotify from "./components/Spotify"
import { Scopes, SearchResults, SpotifyApi } from "@spotify/web-api-ts-sdk"
const sdk = SpotifyApi.withUserAuthorization(import.meta.env.VITE_CLIENT_ID, import.meta.env.VITE_REDIRECT_URI,Scopes.all)
// await sdk.authenticate()

 function App() {

  const {currentWeather , forecast}=useContext(DataContext)
  const [loginSpotify,setLoginSpotify] = useState<boolean>(false)
  
  const login = async () =>{
    await sdk.authenticate()
    setLoginSpotify(!loginSpotify)
  }
 const verifier = window.localStorage.getItem("spotify-sdk:verifier")
  return (
  <div className="App">
  <main className="main">
  <h1>Weather App</h1>
   <>
    {forecast && currentWeather ? (<Weather forecast={forecast} currentWeather= {currentWeather}/>) : <Search/>}
    </>
    {!verifier && <button onClick={login}>Log in Spotify</button>}
    {verifier && <button onClick={login}>Continue to Spotify</button>}
    <Spotify sdk={sdk} loginSpotify={loginSpotify}/>

  </main>
  </div>

  )
}

export default App
