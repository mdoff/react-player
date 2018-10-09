import React from 'react'
import {
  Provider
} from './DataSource';
import './App.css';
import Player from './components/Player'
import PlayerButtons from './components/PlayerButtons'
import TrackList from './components/TrackList'

const findPlaylistIndex = track => searchTrack => searchTrack.url === track.url
export default class App extends React.Component {

  componentDidMount() {
    try {
      const playlist = JSON.parse(localStorage.getItem('playlist'));
      this.setState({playlist});
    } catch (e) {
      console.log('localStorage parse failed');
    }
  }

  playToggle = (play) => {
    const {player} = this.state;
    if(typeof(play) == typeof(true)) {
      this.setState({player: {...player, play: play}})
    } else {
      this.setState({player: {...player, play: !player.play}})
    }
  }

  addTrack = (track) => {
    const {playlist} = this.state;
    const newPlaylist = [...playlist, track];
    this.setState({playlist: newPlaylist});
    localStorage.setItem('playlist', JSON.stringify(newPlaylist));
  }

  removeTrack = (track) => {
    const {playlist} = this.state;
    const index = playlist.findIndex(findPlaylistIndex(track));
    if (index > -1) {
      playlist.splice(index, 1);
    }
    this.setState({playlist});
    localStorage.setItem('playlist', JSON.stringify(playlist));
  }

  playNext = () => {
    const {playlist, player: {url}} = this.state;
    if (playlist.length === 0) return;
    const index = playlist.findIndex(findPlaylistIndex({url}));
    const nextIndex = playlist.length-1 >= index + 1 ? index + 1 : 0;
    this.setState({player: {play: true, url: playlist[nextIndex].url}});

    // Bypassing one video problem
    if (playlist.length === 1) {
      this.setState(
        {player: {play: false, url: playlist[nextIndex].url}}, 
        () => setTimeout(() => this.setState({player: {play: true, url: playlist[nextIndex].url}}), 500)
      );
    }
  }

  playPrevious = () => {
    const {playlist, player: {url}} = this.state;
    if (playlist.length === 0) return;
    const index = playlist.findIndex(findPlaylistIndex({url}));
    const nextIndex = index - 1 >= 0 ? index - 1 : playlist.length - 1;
    this.setState({player: {play: true, url: playlist[nextIndex].url}});
  }

  play = (url) => {
    this.setState({player: {url, play: true}});
  }

  state = {
    player: {
      play: false,
      url: '',
    },
    playlist: [],
    actions: {
      playToggle: this.playToggle,
      play: this.play,
      addTrack: this.addTrack,
      removeTrack: this.removeTrack,
      playNext: this.playNext,
      playPrevious: this.playPrevious,
    },
  }

  render() {
    return <Provider value = {this.state}>
      <div className="App">
        <div className="Player-Wrapper">
          <Player />
          <PlayerButtons />
        </div>
        <TrackList />
      </div>
    </Provider >
  }
}