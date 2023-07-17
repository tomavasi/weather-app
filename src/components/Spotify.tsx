import axios from "axios"
import { useEffect, useState,} from "react"
import { Scopes, SearchResults, SpotifyApi } from "@spotify/web-api-ts-sdk"


function Spotify({sdk, loginSpotify}:{sdk:SpotifyApi, loginSpotify:boolean}) {


const AUTH_ENDPOINT: string = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE: string = "token"

const [token, setToken] = useState<string>("")
const [playlist, setPlaylist]= useState<SearchResults>({} as SearchResults)


// useEffect(()=>{
//   const hash:string  = window.location.hash
//   let token: string | undefined | null = window.localStorage.getItem("token")

//   if (!token && hash){
//     token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token"))?.split("=")[1]

//     if (token){

//     window.location.hash = ""
//     window.localStorage.setItem("token", token)

//   }

//   if (token)
//   setToken(token)}

// },[])
// useEffect(() =>{
//   (async () =>{
//     const results = await sdk.search("clouds", ["playlist"])
//     setPlaylist(() => results)})();
// }, [])
// useEffect(
//   ()=>{
//     if(loginSpotify === true){
//       async () => 
//     }
//   },[]
// )
const getSearchPlaylist = async () =>{
  const results = await sdk.search("clouds", ["playlist"])
  setPlaylist(() => results)
}
// const getSearchPlaylist = async () =>{
//     const {data} = await axios.get("https://api.spotify.com/v1/search",{
//         headers:{
//             Authorization: `Bearer ${token}`
//         },
//         params: {
//             q: "clouds",
//             type: "playlist"
//         }

//     })
//     setPlaylist(data.playlists.items)

// }

console.log(playlist)
// console.log(token)
return (
    <div>Spotify
      {/* <button onClick={sdk.authenticate}>Login to spotify</button> */}
    {/* <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}> Login to Spotify</a> */}
    <button onClick={getSearchPlaylist}>Search</button>
    </div>
  )
}

export default Spotify