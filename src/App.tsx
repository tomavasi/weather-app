import Search from "./components/Search"
import  './App.css'
import Weather from "./components/Weather"
import { useContext, useState, useEffect } from "react"
import { DataContext } from "./context/DataContext"
import { SpotifyApi, Scopes} from "@spotify/web-api-ts-sdk"
import WebPlaybackPlayer from "./components/WebPlayback"
import * as React from "react"



 function App() {
  const {currentWeather , forecast}= useContext(DataContext)
  const sdk = SpotifyApi.withUserAuthorization(
    import.meta.env.VITE_CLIENT_ID,
    import.meta.env.VITE_REDIRECT_URI,
    Scopes.all
  )
  const [accessToken, setAccessToken] = useState<string | null>("")
  const [loginState, setloginState] = useState("")
useEffect(()=>{
  const localLogin =  window.localStorage.getItem("login")
  if (localLogin === "true")
  (() => sdk.authenticate().then(()=> setloginState(localLogin)).catch((err)=>console.error(err)))()
},[])

useEffect(()=>{
  (async () => {
    const localStorageToken = await sdk.getAccessToken();
    if (localStorageToken) {
      setAccessToken(localStorageToken.access_token)
    }})()
},[loginState])

const loginToSpotify =  () => {
sdk.authenticate().then(()=>window.localStorage.setItem("login" , "true")).catch((err)=>console.error(err))
}

  return (
  <main className="main">
  <div className="mainSection">
  <div className="title">
    <h1>Weath</h1><span>ify</span>
  </div>
  {/* <SpotifyLogin sdk={sdk} accessToken={accessToken} setloginState={setloginState}/> */}
    {(!loginState || loginState === "false") &&
    <div>
    <p className="p1">
      Welcome to Weathify!
    </p>
    <p className="p2">
      With Weathify you can look up the weather of your city or any other place and get relatable Spotify playlists depending on the current weather
    </p>
    <p className="p3">
    In order to procceed to the app you need a Spotify account.
    </p>
    <div className="spotifybtn">
    <button  onClick={loginToSpotify}>Login to Spotify</button></div>
    <p className="p4">
      * This app is in development mode and it requires a communication with the Spotify services. Besides logging in ,using the button above, the developer needs to grand access to a specific account manually. Do you wish to get access in order to check the funcionality of the app? Please contact the developer.
    </p>
    </div>}
    {!forecast && accessToken &&
    <Search/>}
    {forecast && currentWeather && loginState === "true"&&
    <div>
    <Weather forecast={forecast} currentWeather= {currentWeather}/>
    </div>
    }
  </div>
  {forecast && currentWeather && loginState === "true"&&
  <WebPlaybackPlayer sdk={sdk} accessToken={accessToken} setloginState={setloginState}/>
  }
  </main>
  )
}

export default App
