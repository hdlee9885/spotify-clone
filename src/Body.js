import React from 'react'
import "./Body.css"
import { useDataLayerValue } from './DataLayer'
import Header from './Header'
import SongRow from './SongRow'
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

function Body({ spotify }) {
    const [{ discover_weekly}, dispatch] = useDataLayerValue();

    const playPlaylist = (id) => {
        spotify.play({
            "context_uri": `spotify:playlist:37i9dQZEVXcSaBc4guSZWX`
        })
        .then((res) => {
            spotify.getMyCurrentPlayingTrack().then((song) => {
                dispatch({
                    type: 'SET_ITEM',
                    item: song.item,
                });
                dispatch({
                    type: 'SET_PLAYING',
                    playing: true,
                });
            });
        });
    };

    const playSong = (id) => {
        spotify.play({
            "uris": [`spotify:track:${id}`],
        })
        .then((res) => {
            spotify.getMyCurrentPlayingTrack().then((song) => {
                dispatch({
                    type: 'SET_ITEM',
                    item: song.item,
                });
                dispatch({
                    type: 'SET_PLAYING',
                    playing: true,
                });
            });
        });
    };
    
    console.log(discover_weekly)
    return (
        <div className="body">
            <Header spotify={spotify} />
            <div className="body-info">
                <img src={discover_weekly?.images[0].url} alt=""/>
                <div className="body-info-text">
                    <strong>PLAYLIST</strong>
                    <h2>{discover_weekly?.name}</h2>
                    <p>{discover_weekly?.description}</p>
                </div>
            </div>

            <div className="body_songs">
                <div className="body-icons">
                    <PlayCircleFilledIcon 
                        onClick={playPlaylist} 
                        className="body-shuffle" />
                    <FavoriteIcon fontSize="large"/>
                    <MoreHorizIcon />
                </div>

                {/* List of songs */}
                {discover_weekly?.tracks.items.map((item) => (
                    <SongRow playSong={playSong} track={item.track} />
                ))}
            </div>
        </div>
    )
}

export default Body
