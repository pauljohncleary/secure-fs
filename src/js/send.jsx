var React = require('react');
var uuid = require('uuid');

var SendArea = require('./components/sendFile.jsx');

var Send = React.createClass({

  getDefaultProps(){
    return {
      //roomId: uuid.v4()
      roomId: 'test'
    };
  },
  render: function() {
    const { dispatch, status } = this.props;

    return (
      <div>
        <SendArea
          roomId = {this.props.roomId}
          onRoomChange =  {() => dispatch({
              type: 'ROOM_CHANGE',
              room: this.props.roomId
            })}
        />
      </div>
    );
  }
});

export default Send;
