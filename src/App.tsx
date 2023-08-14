import Search from "./components/Search"
import  './App.css'
import Weather from "./components/Weather"
import { useContext, useState, useEffect } from "react"
import { DataContext } from "./context/DataContext"
import { SpotifyApi, Scopes} from "@spotify/web-api-ts-sdk"
import WebPlaybackPlayer from "./components/WebPlayback"



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
  (async () => await sdk.authenticate().then(()=> setloginState(localLogin)))()
},[])

useEffect(()=>{
  (async () => {
    const localStorageToken = await sdk.getAccessToken();
    if (localStorageToken) {
      setAccessToken(localStorageToken.access_token)
    }})()
},[loginState])

const loginToSpotify = async () => {
sdk.authenticate().then(()=>window.localStorage.setItem("login" , "true"))
}
  return (
  <div className="App">
  <main className="main">
  <div className="title"><h1>Weather App</h1></div>
   <>
    {(!loginState || loginState === "false") &&
    <div>
    <p>
    In order to procceed to the app you need a Spotify account.
    </p>
    <button onClick={loginToSpotify}>Login to Spotify</button></div>}
    {!forecast && accessToken &&
    <Search/>}
    {forecast && currentWeather && loginState === "true"&&
    <>
    <Weather forecast={forecast} currentWeather= {currentWeather}/>
    <WebPlaybackPlayer sdk={sdk} accessToken={accessToken} setloginState={setloginState}/>
    </>
    }
    </>
  </main>
  </div>

  )
}

export default App
