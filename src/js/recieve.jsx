var React = require('react');
var Recieve = React.createClass({

  componentWillMount() {
    const { dispatch } = this.props
    const path = window.location.pathname.substr(9);

    dispatch({
        type: 'ROOM_CHANGE',
        room: path
      });
  },

  componentDidUpdate() {
    const { dispatch, peer } = this.props

    if(Object.keys(peer).length > 0 ) {
      peer.on('fileTransfer', function (metadata, receiver) {
        console.log('incoming filetransfer', metadata.name, metadata);
        receiver.on('progress', function (bytesReceived) {
            console.log('receive progress', bytesReceived, 'out of', metadata.size);
        });
        // get notified when file is done
        receiver.on('receivedFile', function (file, metadata) {
            console.log('received file', metadata.name, metadata.size);

            // close the channel
            receiver.channel.close();
        });
        //filelist.appendChild(item);
      });
    }
  },

  render: function() {
    return (
      <h2>recieve page</h2>
    );
  }
});

export default Recieve;
