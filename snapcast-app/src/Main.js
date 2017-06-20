import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Main extends Component {
  login() {
    this.props.auth.login();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container-fluid">
        <div className="jumbotron">
          <div className='row'>
            <div className='col-sm-5'>
                <h1>
                  <b>Snap</b>cast Deckbuilder
                </h1>
                <h4 id="version">
                  version 1.00
                </h4>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default Main;