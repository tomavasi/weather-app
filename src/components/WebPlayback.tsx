import * as React from "react";
import { useCallback, memo } from "react";
import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";
import SpotifyControl from "./SpotifyControl";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";

function WebPlaybackPlayer({sdk, accessToken, setloginState}:{sdk:SpotifyApi | null | undefined, accessToken:string | null, setloginState: React.Dispatch<React.SetStateAction<string>>}) {
  const getOAuthToken: Spotify.PlayerInit["getOAuthToken"] = useCallback(
    (callback) => {
      if (accessToken) {
        callback(accessToken);
      } else {
        callback("");
      }
    },
    [accessToken]
  );

const MemoedSpotifyControl = memo(SpotifyControl, (prevProps,nextProps) =>{
  return prevProps.accessToken === nextProps.accessToken
}
)
  return (
    <WebPlaybackSDK
    initialDeviceName="weather-app-spotify"
    getOAuthToken={getOAuthToken}
    connectOnInitialized={true}
    initialVolume={0.5}>
    <MemoedSpotifyControl sdk={sdk} accessToken={accessToken} setloginState={setloginState}/>
    </WebPlaybackSDK>
  )
}

export default WebPlaybackPlayer

