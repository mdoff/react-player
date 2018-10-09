import React from 'react'
import {Icon, Button} from 'antd'
import TrackForm from '../TrackForm'
import {Consumer} from '../../DataSource'

import './style.css'

const TrackItem = ({track, player, actions}) => <div className={`Track-Item ${track.url === player.url ? ' Active' : ''}`}>
  <div className="Info">
    <span className="title">{track.title}</span>
    <span className="artist">{track.artist}</span>
  </div>
  <div className="Actions">
    <Button onClick={() => actions.removeTrack(track)}><Icon type="close" theme="outlined" /></Button>
    <Button onClick={() => track.url === player.url ? actions.playToggle() : actions.play(track.url)}>
      <Icon type={track.url === player.url && player.play ? 'pause' : 'caret-right'} theme="outlined" />
    </Button>
  </div>
</div>

export default class TrackList extends React.Component {
  state = {showForm: false}
  render() {
    return <div className="Track-List">
    {this.state.showForm
    ? <TrackForm onClose={() => this.setState({showForm: false})} />
    : <Button
        title="Add Track"
        onClick={() => this.setState({showForm: true})}>
        <Icon type="plus" theme="outlined" />
      </Button>}
    <Consumer>
    {data => data.playlist.map(
      (track, index) => <TrackItem
        key={`track-${index}`}
        track={track} player={data.player}
        actions={data.actions}/>
      )}
    </Consumer>
    </div>
  }
}