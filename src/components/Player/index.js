import React from 'react'
import ReactPlayer from 'react-player'
import {Consumer} from '../../DataSource'

export default () => <Consumer>
  {(data) => <ReactPlayer
    url={data.player.url}
    playing={data.player.play}
    onPause={() => data.actions.playToggle(false)}
    onPlay={() => data.actions.playToggle(true)}
    onEnded={() => data.actions.playNext()}
    controls
    />}
</Consumer>