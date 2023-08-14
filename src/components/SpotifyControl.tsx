import { useEffect, useState, useContext } from "react"
import {SpotifyApi, SearchResults, User } from "@spotify/web-api-ts-sdk"
import { DataContext } from "../context/DataContext";
import {
  usePlaybackState,
  usePlayerDevice,
  useSpotifyPlayer
} from "react-spotify-web-playback-sdk";
import {MdSkipNext, MdSkipPrevious,MdPlayArrow,MdPause,MdVolumeOff,MdVolumeDown,MdVolumeUp,MdShuffle,MdLogout,MdRefresh, MdRemove, MdAdd} from "react-icons/md"



function SpotifyControl({sdk, accessToken, setloginState}:{sdk:SpotifyApi | null | undefined, accessToken: string | null,setloginState: React.Dispatch<React.SetStateAction<string>>}) {
const {currentWeather}= useContext(DataContext)
const [playlists, setPlaylist]= useState<SearchResults>({} as SearchResults)
const [shuffle, setShuffle] = useState(false)
const [volume, setVolume] = useState(0.5)
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

return (
  <div>
    Spotify
    {!playerDevice ? (
      <p>Loading...</p>
    ) : (
      <>
      <div>
        {user.display_name}
      </div>
        <p>{currentlyPlaying?.name}</p>
          <p>{currentlyPlaying?.artists[0].name}</p>
          {currentlyPlaying?.images && (
            <img src={currentlyPlaying.images[1].url} alt="Album Art" />
          )}
        <button onClick={() => player?.previousTrack()}><MdSkipPrevious/></button>
        <button onClick={resumePause}>{togglePlay ? <MdPause/> : <MdPlayArrow/>}</button>
        <button onClick={() => player?.nextTrack()}><MdSkipNext/></button>
        <button onClick={shuffleTrack}><MdShuffle/></button>
        <span onClick={()=>{player?.setVolume(0);setVolume(0)}}>{volume == 0 ? <MdVolumeOff/> : <MdVolumeDown/>}</span>
        <input type="range" min={0.0} max={1.0} step={0.1} value={volume} onChange={changeVolume}/>
        <span><MdVolumeUp/></span>
        <div>
          <button onClick={logOut}><MdLogout/></button>
        </div>
        <button onClick={likeButton}>{likedSong ? <MdRemove/> : <MdAdd/>}</button>
        <button onClick={()=>setRefresh(prev=>!prev)}><MdRefresh/></button>
      </>
    )}
  </div>
);

}

export default SpotifyControl