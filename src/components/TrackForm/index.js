import React from 'react'
import {Input, Button} from 'antd'
import {Consumer} from '../../DataSource'

import './style.css'

export default class TrackForm extends React.Component {
  state = {
    url: '',
    title: '',
    artist: '',
  }
  render() {
    const setValue = (name) => (input) => this.setState({[name]: input.target.value});
    return <div className="Track-Form">
      <Input placeholder="Track title" onChange={setValue('title')} />
      <Input placeholder="Track artist" onChange={setValue('artist')} />
      <Input placeholder="Track url" onChange={setValue('url')} />
      <div className="Actions">
        <Button type="dashed" onClick={this.props.onClose}>Cancel</Button>
        <Consumer>
          {({actions}) => <Button
          type="primary"
          onClick={() => {
            actions.addTrack(this.state);
            this.props.onClose();
          }}>
            Add
            </Button>}
        </Consumer>
      </div>
    </div>
  }
}