import React, { useEffect } from 'react';
import "./Footer.css";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import { Grid, Slider } from "@material-ui/core"
import { useDataLayerValue } from './DataLayer';

function Footer({ spotify }) {
    const [{ item, playing }, dispatch] = useDataLayerValue();

    useEffect(() => {
        spotify.getMyCurrentPlaybackState().then((state) => {
            console.log(state)

            dispatch({
                type: 'SET_PLAYING',
                playing: state.is_playing
            });

            dispatch({
                type: 'SET_ITEM',
                item: state.item
            });
        });
    }, [spotify]);

    const handlePlayPause = () => {
        if (playing)  {
            spotify.pause();
            dispatch({
                type: 'SET_PLAYING',
                playing: false,
            });
        } else {
            spotify.play();
            dispatch({
                type: 'SET_PLAYING',
                playing: true,
            });
        }
    };


    return (
        <div className="footer">
            <div className="footer-left">
                <img className="album-cover" 
                    src={item?.album.images[0].url} 
                    alt={item?.name}></img>
                {item? (
                    <div className="song-info">
                        <h4>{item?.name}</h4>
                        <p>{item?.artists.map((artist) => artist.name).join(", ")}</p>
                    </div>
                ) : (
                    <div className="song-info">
                        <h4>No song is playing</h4>
                        <p>...</p>
                    </div>
                )}  
            </div>

            <div className="footer-center">
                <ShuffleIcon className="footer-green" />
                <SkipPreviousIcon className="footer-icon" />
                {playing ? (
                    <PauseCircleOutlineIcon 
                        onClick={handlePlayPause} 
                        fontSize="large" 
                        className="footer-icon" />
                ) : (
                    <PlayCircleOutlineIcon 
                        onClick={handlePlayPause}
                        fontSize="large" 
                        className="footer-icon" />
                )}
                
                <SkipNextIcon className="footer-icon" />
                <RepeatIcon className="footer-green" />
            </div>

            <div className="footer-right">
                <Grid container spacing={2}>
                    <Grid item>
                        <PlaylistPlayIcon />
                    </Grid>
                    <Grid item>
                        <VolumeDownIcon />
                    </Grid>
                    <Grid item xs>
                        <Slider aria-labelledby="continuous-slider" />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Footer
