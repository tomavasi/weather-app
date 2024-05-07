import * as React from "react";
import { useEffect, useState, useContext } from "react"
import {SpotifyApi, SearchResults, User } from "@spotify/web-api-ts-sdk"
import { DataContext } from "../context/DataContext";
import {
  usePlaybackState,
  usePlayerDevice,
  useSpotifyPlayer
} from "react-spotify-web-playback-sdk";
import {MdSkipNext, MdSkipPrevious,MdPlayArrow,MdPause,MdVolumeOff,MdVolumeDown,MdVolumeUp,MdShuffle,MdLogout,MdRefresh} from "react-icons/md"
import heartSvg from "../assets/heart-64.svg"
import heartSvgRed from "../assets/heart-red.svg"
import Spotify_Logo from "../images/Spotify_Logo_RGB_Green.png"





function SpotifyControl({sdk, accessToken, setloginState}:{sdk:SpotifyApi | null | undefined, accessToken: string | null,setloginState: React.Dispatch<React.SetStateAction<string>>}) {
const {currentWeather}= useContext(DataContext)
const [playlists, setPlaylist]= useState<SearchResults>({} as SearchResults)
const [shuffle, setShuffle] = useState(false)
const [volume, setVolume] = useState(0.5)
const [newVolume,setNewVolume] = useState(0)
const [user, setUser] = useState<User>({} as User)
const [refresh, setRefresh] = useState(false)
const [togglePlay, setTogglePlay] = useState(true)
const [likedSong, setLikedSong] = useState(false)
const [matches, setMatches] = useState(window.matchMedia("(max-width:650px)").matches)

const playbackState = usePlaybackState(true, 100);
const playerDevice = usePlayerDevice();

const player=useSpotifyPlayer();
useEffect(()=>{
  window.matchMedia("(max-width:650px)").addEventListener("change", e => setMatches(e.matches))
},[])
useEffect(() => {
  const setWeatherPlaylist = async () => {
    if (sdk) {
      const results = await sdk.search(
        `${currentWeather?.weather[0].description}`,
        ["playlist"]
      );
      setPlaylist(results);
    }
  }
  setWeatherPlaylist();
}, [currentWeather?.weather[0].description, accessToken]);

useEffect(() => {
  if (!playerDevice || !sdk) return;
  const startPlayback = async () => {
    const playlistItems = playlists.playlists?.items;
    const singlePlaylist = playlistItems.map((playlist) => playlist.uri);
    const playNm = Math.floor(Math.random() * (singlePlaylist?.length - 1));
    await sdk.player.startResumePlayback(
      playerDevice.device_id,
      singlePlaylist[playNm]
    );
  const userProfile = await sdk?.currentUser.profile()
  setUser(userProfile)
  setTogglePlay(true)
  }
  startPlayback();

}, [playerDevice, playlists.playlists?.items, accessToken, refresh]);

const shuffleTrack = () => {
  setShuffle((prevShuffle) => !prevShuffle);
  sdk?.player.togglePlaybackShuffle(!shuffle, playerDevice?.device_id);
};
const currentlyPlaying = playbackState?.context.metadata?.current_item;

const changeVolume = (event:any) =>{
  const newVolume = event.target.value
  setVolume(newVolume);
  player?.setVolume(newVolume)
  return newVolume
  }

const logOut = () =>{
  sdk?.logOut();
  window.localStorage.setItem("login", "false")
  setloginState("false")
}
const likeButton = () =>{
  if (currentlyPlaying){
const currentTrackId = currentlyPlaying?.uri.split(":")[2]
 if (!likedSong){
sdk?.currentUser.tracks.saveTracks([currentTrackId]);
setLikedSong(prev=>!prev)}
else{
sdk?.currentUser.tracks.removeSavedTracks([currentTrackId])
setLikedSong(prev=>!prev)}}
}
const resumePause = () =>{
  if (togglePlay) {
  player?.pause()
  setTogglePlay(prev=>!prev)
}
  else {
  player?.resume()
  setTogglePlay(prev=>!prev)
  }
}
const mute = () =>{
  if (volume != 0){
    player?.setVolume(newVolume);
    setNewVolume(volume);
    setVolume(newVolume)}
  else {
    setVolume(newVolume);
    setNewVolume(0)
    player?.setVolume(newVolume)
  }
    }

return (
  <div className="playbackSpotify">
  {!playerDevice ?
  <div>
  <img src={Spotify_Logo} height={30} width="auto"/>
  <p>Loading...</p>
  </div> :
  <>
    <div className="logo">
     <img src={Spotify_Logo} height={30} width="auto"/>
      <div className="logout">
      Hi, {user.display_name}
      <button onClick={logOut}><MdLogout title="Log out"/></button>
      </div>
    </div>
    {!matches &&
    <div className="mainplayer">
      <div className="trackImg">
      {currentlyPlaying?.images && (
            <img src={currentlyPlaying.images[1].url} alt="Album Art" />
          )}
      <div className="info">
      <p className="track">{currentlyPlaying?.name}</p>
      <p className="artist">{currentlyPlaying?.artists[0].name}</p>
      </div>
      <button className="btnliked" onClick={likeButton}>{!likedSong ? <img src={heartSvg} title="Add to liked"/> : <img src={heartSvgRed} title="Remove from liked"/>}</button>
      </div>
      <div className="playbackbtns">
      <button className="btn" onClick={()=>setRefresh(prev=>!prev)}><MdRefresh title="Refresh playlist"/></button>
        <button className="btn" onClick={() => player?.previousTrack()}><MdSkipPrevious title="Previous"/></button>
        <button className="playbtn" onClick={resumePause}>{togglePlay ? <MdPause title="Pause"/> : <MdPlayArrow title="Play"/>}</button>
        <button className="btn" onClick={() => {player?.nextTrack();setTogglePlay(true)}}><MdSkipNext title="Next"/></button>
        <button className="btn" onClick={shuffleTrack}><MdShuffle/></button>
      </div>
      <div className="volume">
        <p onClick={mute}>{volume == 0 ? <MdVolumeOff /> : <MdVolumeDown/>}</p>
        <p><input type="range" min={0.0} max={1.0} step={0.1} value={volume} onChange={changeVolume}/></p>
        <p><MdVolumeUp/></p>
      </div>
      </div>}
      {matches &&
      <div className="mobile">
       <div className="mainplayer">
       <div className="trackImg">
       {currentlyPlaying?.images && (
             <img src={currentlyPlaying.images[1].url} alt="Album Art" />
           )}
      <div className="mobileInfo">
       <div className="info">
       <p className="track">{currentlyPlaying?.name}</p>
       <p className="artist">{currentlyPlaying?.artists[0].name}</p>
       </div>
       <button className="btnliked" onClick={likeButton}>{!likedSong ? <img src={heartSvg} title="Add to liked"/> : <img src={heartSvgRed} title="Remove from liked"/>}</button>
       </div>
       </div>
       <div className="playbackbtns">
       <button className="btn" onClick={()=>setRefresh(prev=>!prev)}><MdRefresh title="Refresh playlist"/></button>
         <button className="btn" onClick={() => player?.previousTrack()}><MdSkipPrevious title="Previous"/></button>
         <button className="playbtn" onClick={resumePause}>{togglePlay ? <MdPause title="Pause"/> : <MdPlayArrow title="Play"/>}</button>
         <button className="btn" onClick={() => {player?.nextTrack();setTogglePlay(true)}}><MdSkipNext title="Next"/></button>
         <button className="btn" onClick={shuffleTrack}><MdShuffle/></button>
       </div>
       </div>
       <div className="volume">
       <p><MdVolumeUp/></p>
       <p><input type="range" min={0.0} max={1.0} step={0.1} value={volume} onChange={changeVolume}/></p>
       <p onClick={mute}>{volume == 0 ? <MdVolumeOff /> : <MdVolumeDown/>}</p>
     </div>
     </div>
       }
      </>}
    </div>
);

}

export default SpotifyControl