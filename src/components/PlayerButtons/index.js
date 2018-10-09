import React from 'react'
import {Icon, Button} from 'antd'
import {Consumer} from '../../DataSource'

import './style.css'

export default () => <Consumer>
  {data => <div className="Player-Buttons">
    <Button onClick={data.actions.playPrevious}>
      <Icon type="step-backward" theme="outlined" />
    </Button>
    <Button onClick={data.actions.playToggle}>
      <Icon type={data.player.play ? 'pause' : 'caret-right'} theme="outlined" />
    </Button>
    <Button onClick={data.actions.playNext}>
      <Icon type="step-forward" theme="outlined" />
    </Button>
    </div>}
</Consumer>