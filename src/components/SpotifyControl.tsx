import { useEffect, useState, useContext } from "react"
import {SpotifyApi, SearchResults, User } from "@spotify/web-api-ts-sdk"
import { DataContext } from "../context/DataContext";
import {
  usePlaybackState,
  usePlayerDevice,
  useSpotifyPlayer
} from "react-spotify-web-playback-sdk";
import {MdSkipNext, MdSkipPrevious,MdPlayArrow,MdPause,MdVolumeOff,MdVolumeDown,MdVolumeUp,MdShuffle,MdLogout,MdRefresh, MdAccountCircle} from "react-icons/md"

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

const playbackState = usePlaybackState(true, 100);
const playerDevice = usePlayerDevice();

const player=useSpotifyPlayer();
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
      <MdAccountCircle/>
      {user.display_name}
      <button onClick={logOut}><MdLogout/></button>
      <button onClick={()=>setRefresh(prev=>!prev)}><MdRefresh/></button>
      </div>
    </div>
    <div className="mainplayer">
      <div className="trackImg">
      {currentlyPlaying?.images && (
            <img src={currentlyPlaying.images[1].url} alt="Album Art" />
          )}
      </div>
      <div className="info">
      <p className="artist">{currentlyPlaying?.artists[0].name}</p>
      <p className="track">{currentlyPlaying?.name}</p>
      <div className="playbackbtns">
        <button className="btn" onClick={likeButton}>{!likedSong && <svg width="150" height="150" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
<path d="M125.784 35.0369C113.039 22.2916 92.9859 21.3682 79.1227 32.8994C79.1062 32.9135 77.318 34.3807 75 34.3807C72.6234 34.3807 70.9266 32.9416 70.8609 32.8853C57.0141 21.3682 36.9609 22.2916 24.2156 35.0369C17.6695 41.583 14.0625 50.2877 14.0625 59.5478C14.0625 68.808 17.6695 77.5127 24.0914 83.9228L64.3078 131.006C66.9844 134.14 70.882 135.938 75 135.938C79.1203 135.938 83.0156 134.14 85.6922 131.009L125.782 84.0611C139.301 70.5447 139.301 48.5533 125.784 35.0369ZM122.346 80.8807L82.1297 127.964C80.3461 130.05 77.7469 131.25 75 131.25C72.2531 131.25 69.6562 130.053 67.8703 127.964L27.532 80.7447C21.8695 75.0822 18.75 67.5541 18.75 59.5478C18.75 51.5392 21.8695 44.0135 27.5297 38.351C33.3961 32.4822 41.0555 29.5127 48.7336 29.5127C55.4742 29.5127 62.2289 31.8025 67.7977 36.4338C68.0977 36.7033 70.8586 39.0682 75 39.0682C79.0266 39.0682 81.8578 36.7314 82.1367 36.49C94.1109 26.5291 111.45 27.3307 122.47 38.351C134.159 50.0393 134.159 69.0564 122.346 80.8807Z" fill="#fafafa" />
</svg>}</button>
        <button className="btn" onClick={() => player?.previousTrack()}><MdSkipPrevious/></button>
        <button className="playbtn" onClick={resumePause}>{togglePlay ? <MdPause/> : <MdPlayArrow/>}</button>
        <button className="btn" onClick={() => {player?.nextTrack();setTogglePlay(true)}}><MdSkipNext/></button>
        <button className="btn" onClick={shuffleTrack}><MdShuffle/></button>
      </div>
      </div>
      <div className="volume">
        <p onClick={mute}>{volume == 0 ? <MdVolumeOff /> : <MdVolumeDown/>}</p>
        <p><input type="range" min={0.0} max={1.0} step={0.1} value={volume} onChange={changeVolume}/></p>
        <p><MdVolumeUp/></p>
        </div>
      </div>
      </>}
    </div>
);

}

export default SpotifyControl