import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home/Home';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';

//import registerServiceWorker from './registerServiceWorker';
import './index.css';

import { Redirect, Route, BrowserRouter, Link } from 'react-router-dom';

import App from './App';
import Deckbuilder from './Deckbuilder';
import Lists from './Lists';
import Decks from './Decks';
import Profile from './Profile/Profile';
import Main from './Main';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

ReactDOM.render(
    <BrowserRouter history={history} component={App}>
        <div>
          <Route path="/" render={(props) => <App auth={auth} {...props} />} />
          <Redirect from="/" to="/main"/>
          <Route path="/main" render={(props) => <Main auth={auth} {...props} />} />
          <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
          <Route path="/deckbuilder" render={(props) => <Deckbuilder auth={auth} {...props} />} />
          <Route path="/lists/:format" render={(props) => <Lists auth={auth} {...props} />} />
          <Route path="/decks/:deckId" render={(props) => <Decks auth={auth} {...props} />} />
          <Route path="/profile" render={(props) => (
            !auth.isAuthenticated() ? (
              <Redirect to="/home"/>
            ) : (
              <Profile auth={auth} {...props} />
            )
          )} />
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} /> 
          }}/>        
        </div>
      </BrowserRouter>,
    document.getElementById('root')
);
    //registerServiceWorker();
