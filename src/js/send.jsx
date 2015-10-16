var React = require('react');
var connect = require('react-redux').connect;
var Component = require('react'),Component;
var PropTypes = require('react'),PropTypes;

var Status = require('./components/status.jsx');
var SendArea = require('./components/sendFile.jsx');


var Send = React.createClass({

  componentDidMount() {

    //to get this to work i need to make this a dumb component and register a callback in app.jsx instead
    connect.dispatch({
      type: 'NEW_HASH_ID',
      payload: {
        hashId: 'test'
      }
    });

  },
  render: function() {
    // Injected by connect() call at end of the file
    const { dispatch, status } = this.props;
    return (
      <div>
        <Status status={status} />
        <SendArea />
      </div>
    );
  }
});

module.exports = Send;
