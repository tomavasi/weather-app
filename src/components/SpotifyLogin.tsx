import { useEffect, useState, useContext } from "react"
import {SpotifyApi, SearchResults, User } from "@spotify/web-api-ts-sdk"
import { DataContext } from "../context/DataContext";
import {
  usePlaybackState,
  usePlayerDevice,
  useSpotifyPlayer
} from "react-spotify-web-playback-sdk";
import {MdSkipNext, MdSkipPrevious,MdPlayArrow,MdPause,MdVolumeOff,MdVolumeDown,MdVolumeUp,MdShuffle,MdLogout,MdRefresh, MdRemove, MdAdd, MdAccountCircle} from "react-icons/md"
import Spotify_Icon from "../images/Spotify_Icon_RGB_Green.png"
import Spotify_Logo from "../images/Spotify_Logo_RGB_Green.png"



function SpotifyLogin() {
// const {currentWeather}= useContext(DataContext)
// const [playlists, setPlaylist]= useState<SearchResults>({} as SearchResults)
// const [shuffle, setShuffle] = useState(false)
// const [volume, setVolume] = useState(0.5)
// const [newVolume,setNewVolume] = useState(0)
// const [user, setUser] = useState<User>({} as User)
// const [refresh, setRefresh] = useState(false)
// const [togglePlay, setTogglePlay] = useState(true)
// const [likedSong, setLikedSong] = useState(false)

// const playbackState = usePlaybackState(true, 100);
// const playerDevice = usePlayerDevice();
// const player=useSpotifyPlayer();
// useEffect(() => {
//   const setWeatherPlaylist = async () => {
//     if (sdk) {
//       const results = await sdk.search(
//         `${currentWeather?.weather[0].description}`,
//         ["playlist"]
//       );
//       setPlaylist(results);
//     }
//   }
//   setWeatherPlaylist();
// }, [currentWeather?.weather[0].description, accessToken]);

// useEffect(() => {
//   if (!playerDevice || !sdk) return;
//   const startPlayback = async () => {
//     const playlistItems = playlists.playlists?.items;
//     const singlePlaylist = playlistItems.map((playlist) => playlist.uri);
//     const playNm = Math.floor(Math.random() * (singlePlaylist?.length - 1));
//     await sdk.player.startResumePlayback(
//       playerDevice.device_id,
//       singlePlaylist[playNm]
//     );
//   const userProfile = await sdk?.currentUser.profile()
//   setUser(userProfile)
//   }
//   startPlayback();

// }, [playerDevice, playlists.playlists?.items, accessToken, refresh]);

// const shuffleTrack = () => {
//   setShuffle((prevShuffle) => !prevShuffle);
//   sdk?.player.togglePlaybackShuffle(!shuffle, playerDevice?.device_id);
// };
// const currentlyPlaying = playbackState?.context.metadata?.current_item;

// const changeVolume = (event:any) =>{
//   const newVolume = event.target.value
//   setVolume(newVolume);
//   player?.setVolume(newVolume)
//   return newVolume
//   }

// const logOut = () =>{
//   sdk?.logOut();
//   window.localStorage.setItem("login", "false")
//   setloginState("false")
// }
// const likeButton = () =>{
//   if (currentlyPlaying){
// const currentTrackId = currentlyPlaying?.uri.split(":")[2]
//  if (!likedSong){
// sdk?.currentUser.tracks.saveTracks([currentTrackId]);
// setLikedSong(prev=>!prev)}
// else{
// sdk?.currentUser.tracks.removeSavedTracks([currentTrackId])
// setLikedSong(prev=>!prev)}}
// }
// const resumePause = () =>{
//   if (togglePlay) {
//   player?.pause()
//   setTogglePlay(prev=>!prev)
// }
//   else {
//   player?.resume()
//   setTogglePlay(prev=>!prev)
//   }
// }
// const mute = () =>{
//   if (volume != 0){
//     player?.setVolume(newVolume);
//     setNewVolume(volume); 
//     setVolume(newVolume)}
//   else {
//     setVolume(newVolume);
//     setNewVolume(0)
//     player?.setVolume(newVolume)
//   }
//     }

return (
  <div className="playbackSpotify">
    <div className="logo">
    <img src={Spotify_Logo} height={30} width="auto"/>
    <div className="logout">
      <MdAccountCircle/>
      <p>Username</p>
      <button ><MdLogout/></button>
      <button ><MdRefresh/></button>
    </div>
    </div>
      <div className="mainplayer">
      <img src={Spotify_Icon} alt="Album Art" height={80} width={100}/>
      <div className="info">
      <p className="artist">Here is the artist name</p>
      <p className="track">Here is the track name</p>
      <div className="playbackbtns">
         <button className="btn" ><MdAdd/></button>
        <button className="btn"><MdSkipPrevious/></button>
        <button className="playbtn"><MdPlayArrow/></button>
        <button className="btn"><MdSkipNext/></button>
        <button className="btn"><MdShuffle/></button>
      </div>
      </div>
      <div className="volume">
        <MdVolumeDown/>
        <input type="range" min={0.0} max={1.0} step={0.1}/>
        <MdVolumeUp/>
        </div>
      </div>
  </div>
);

}

export default SpotifyLogin