/* NEXT STEPS:
- fix up the UI / handle receiving and downloading
- restrict to max two peers in a room
- stream files from browser to hdd space somehow?
- encrypt files
*/

var jquery = require('jquery');
global.$ = jquery;

var React = require('react');
import { Provider } from 'react-redux';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

var store = require('./store');
var App = require('./app.jsx')(store);

let rootElement = document.getElementById('remotes');
React.render(
  <div>
    <Provider store={store}>
      {() => <App
        onRouteChange={ route =>
          store.dispatch({
            type: 'ROUTE_CHANGE',
            route: window.location.pathname.substr(1)
          })
        }/>}
    </Provider>
    <DebugPanel top right bottom>
      <DevTools store={store} monitor={LogMonitor} />
    </DebugPanel>
  </div>,
  rootElement
);
