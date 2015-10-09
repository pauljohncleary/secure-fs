import React, { findDOMNode, Component, PropTypes } from 'react';

export default class Sharing extends Component {
  render() {
    return (
      <div>
        <input type='text' ref='input' />
        <button onClick={e => this.handleClick(e)}>
          Add
        </button>
      </div>
    );
  }

  handleClick(e) {
    const node = findDOMNode(this.refs.input);
    const text = node.value.trim();
    this.props.onAddClick(text);
    node.value = '';
  }
}

Sharing.propTypes = {
  onAddClick: PropTypes.func.isRequired
};
