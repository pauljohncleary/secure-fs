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

  componentDidUpdate() {
    const { dispatch, peerConnectionStatus } = this.props
    var fileInput = document.getElementById('fileInput');

    if(peerConnectionStatus === 'new') {

      fileInput.disabled = false;
      fileInput.addEventListener('change', function() {
        let fileId = uuid.v4();
        let fileName = fileInput.files[0].name;

        dispatch({
          type: 'NEW_FILE',
          id: fileId,
          name: fileName
        });

      });

    }  else {
      fileInput.disabled = true;
    }


  },

  render: function() {
    const { roomId } = this.props
    this.props.fileQueue.map(function(file) {
      console.log(file.name);
    });
    return (
      <div>
        <h1>ID: {roomId}</h1>
        <input type="file" id="fileInput" disabled="disabled"/>
        {this.props.fileQueue.map(function(file) {
          return <File key={file.id} name={file.name}></File>
        })}
      </div>
    );
  }
});

export default Send;
