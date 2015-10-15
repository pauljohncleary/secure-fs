var React = require('react');
var connect = require('react-redux').connect;
var Component = require('react'),Component;
var PropTypes = require('react'),PropTypes;

var Status = require('./components/status.jsx');

var View = React.createClass({
  render: function() {
    // Injected by connect() call at end of the file
    const { dispatch, status } = this.props;
    //console.log(this.props);
    console.log(this.props);
    return (
      <div>
        <Status status={status} />
      </div>
    );
  }
});

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
  return {
    status: state
  };
}

module.exports = connect(select)(View);
;
