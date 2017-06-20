import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';

import {Link} from 'react-router-dom';
import {DropdownButton, MenuItem} from 'react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

class App extends Component {

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;    

    return (
      <div className="container">
        <div className="row">
          <nav className="navbar navbar-default navbar-fixed-top" id="navHome">
            <div className="container-fluid">
      
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="/"><b>Snap</b>cast Deckbuilder</a>
              </div>

              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav">
                  <li><Link to="/blog">Dev Blog</Link></li>
                  <li><Link to="/deckbuilder">Deckbuilder</Link></li>
                  <DropdownButton id="dropdown" title="Decklists">
                    <MenuItem><Link to='/lists/Standard'>Standard</Link></MenuItem>
                    <MenuItem><Link to='/lists/Modern'>Modern</Link></MenuItem>
                    <MenuItem><Link to='/lists/Legacy'>Legacy</Link></MenuItem>
                    <MenuItem><Link to='/lists/Vintage'>Vintage</Link></MenuItem>
                    <MenuItem><Link to='/lists/Misc'>Misc</Link></MenuItem>
                  </DropdownButton>
                </ul>
                <div className="navbar-right">
                  {
                    !isAuthenticated() && (
                      <button className="btn btn-default navbar-btn" onClick={this.login.bind(this)}>Sign In</button>
                    )
                  }
                  {
                    isAuthenticated() && (
                      <button className="btn btn-default navbar-btn" onClick={this.goTo.bind(this, 'profile')}>Profile</button>
                    )
                  }
                  {
                    isAuthenticated() && (
                      <button className="btn btn-default navbar-btn" onClick={this.logout.bind(this)}>Sign Out</button>
                    )
                  }      
                </div>
              </div>
            </div>
        </nav>
      </div>
      <div className="row">
        {this.props.children}
      </div>
    </div>
    );
  }
}

export default App;
