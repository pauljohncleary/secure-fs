var React = require('react');
var DownloadedFile = require('./components/downloadedFile.jsx')
var IncomingFile = require('./components/incomingFile.jsx')

var Recieve = React.createClass({

  componentWillMount() {
    const { dispatch } = this.props
    const path = window.location.pathname.substr(9);

    dispatch({
        type: 'ROOM_CHANGE',
        room: path
      });
  },

  render: function() {
    const { incomingTransfers, availableForDownload } = this.props;
    console.log(incomingTransfers);

    return (
      <div>
        <h2>Incoming Files</h2>
        {incomingTransfers.map(function(file) {
          return <IncomingFile key={file.id} bytesReceived={file.bytesReceived} name={file.file.name} ></IncomingFile>
        })}
        <h2>Downloaded Files</h2>
        {availableForDownload.map(function(file) {
          return <DownloadedFile key={file.id} id={file.id} name={file.file.name}></DownloadedFile>
        })}
      </div>
    );
  }
});

export default Recieve;
