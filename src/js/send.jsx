var React = require('react');
var uuid = require('uuid');

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
    const { dispatch, peer } = this.props
    var fileInput = document.getElementById('fileInput');

    if(Object.keys(peer).length > 0 ) {
      fileInput.disabled = false;
      fileInput.addEventListener('change', function() {
        let fileId = uuid.v4();
        let fileName = fileInput.files[0].name;

        dispatch({
          type: 'NEW_FILE',
          id: fileId,
          name: fileName
        });

        var file = fileInput.files[0];
        var sender = peer.sendFile(file);

        sender.on('progress', function(bytesSent) {
          dispatch({
            type: 'FILE_SENDING',
            id: fileId,
            bytes: bytesSent
          });
        });

        sender.on('complete', function() {
          dispatch({
            type: 'FILE_SEND_COMPLETE',
            id: fileId,
          });
        });
      });
    } else {
      fileInput.disabled = true;
    }
  },

  render: function() {
    const { roomId } = this.props

    return (
      <div>
        <h1>ID: {roomId}</h1>
        <input type="file" id="fileInput" disabled="disabled"/>
      </div>
    );
  }
});

export default Send;
