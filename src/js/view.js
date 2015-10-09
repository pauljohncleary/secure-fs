import React, { Component } from 'react';
import { connect } from 'react-redux';
import Status from './components/status';
import Sharing from './components/sharing';

export default class View extends Component {
  render() {
    const { dispatch } = this.props;
    return (
      <div>
        <Status status={'Connecting...'} />
        <Sharing
          onAddClick={text =>
            console.log('add todo', text)
          } />
      </div>
    );
  }
}
