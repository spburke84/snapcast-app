import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './App.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';

import {Link} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

class Lists extends Component {
    constructor() {
        super();
        this.state = {
            decklist: []
        }
        this.updated = false;
    }
  
  /*componentWillMount() {
      axios.get('http://localhost:8080/lists/' + this.props.match.params.format).then(result => {
          let tempState = result.data;
          console.log(this.props.match.params.format);
          console.log(tempState);
          this.setState({
              decklist: tempState
          });
      });
  }*/

    componentWillMount() {
        console.log(this.props);
    }
    
    listDecksByFormat = () => {

        console.log('i am here');
        console.log(this.updated);
        if (!this.updated) {
            this.updated = !this.updated;
            axios.get('http://localhost:8080/lists/' + this.props.match.params.format).then(result => {
            console.log(result.data);
            this.setState({
              decklist: result.data
            });
        });
        } else {
            this.updated = !this.updated;
        
            let formatDecks = [];

            for(let j = 0; j < this.state.decklist.length; j++) {
                formatDecks.push(<Link to={'/decks/' + this.state.decklist[j]._id}><ListItem insetChildren={true} primaryText={this.state.decklist[j].name} secondaryText={this.state.decklist[j].author} /></Link>);
            }
            console.log(this.state.decklist);
            return formatDecks;
            }
        }

  render() {
    return (
        <MuiThemeProvider>
            <div className="container">
                <div className="row">
                    <div className="col-sm-4">
                        <h1>{this.props.match.params.format} Decks:</h1>
                        <List>
                            {this.listDecksByFormat()}
                        </List>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                    </div>
                </div>
            </div>
        </MuiThemeProvider>
    );
  }
}

export default Lists;