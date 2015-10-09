import React, { findDOMNode, Component, PropTypes } from 'react';

export default class Status extends Component {
  render() {
    return (
      <div>
        <strong>{this.props.status}</strong>
      </div>
    );
  }
}
