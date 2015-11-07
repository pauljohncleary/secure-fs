var React = require('react');
var uuid = require('uuid');
var File = require('./components/file.jsx')

var Send = React.createClass({
  getDefaultProps: function() {
    return { roomId: 'test' };
    // return { roomId: uuid.v4() };
  },

  componentWillMount() {
    const { dispatch, peer, roomId } = this.props
    dispatch({
        type: 'ROOM_CHANGE',
        room: roomId
      });
  },

  componentDidMount() {
    const { dispatch, peerConnectionStatus } = this.props
    var fileInput = document.getElementById('fileInput');

    fileInput.addEventListener('change', function() {
      if(fileInput.files[0]) {
        let fileId = uuid.v4();
        let file = fileInput.files[0];
        dispatch({
          type: 'NEW_FILE',
          id: fileId,
          file: file
        });
        fileInput.value = null;
      }
    });
  },

  render: function() {
    const { roomId, dispatch } = this.props

    return (
      <div>
        <h1>ID: {roomId}</h1>
        <input type="file" id="fileInput" />
        <h2>Files to send</h2>
        {this.props.fileQueue.map(function(file) {
          return <File key={file.id} id={file.id} name={file.file.name} dispatch={dispatch}></File>
        })}
        <h2>Outgoing Transfers</h2>
        {this.props.outgoingTransfers.map(function(file) {
          return <File key={file.id} id={file.id} name={file.file.name} dispatch={dispatch}></File>
        })}
        <h2>Sent Files</h2>
        {this.props.sentFiles.map(function(file) {
          return <File key={file.id} id={file.id} name={file.file.name} dispatch={dispatch}></File>
        })}
      </div>
    );
  }
});

export default Send;
