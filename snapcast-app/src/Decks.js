import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './App.css';
import CardViewer from './CardViewer';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';

import {Router, Route, browserHistory} from 'react-router';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

class Decks extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            author: '',
            cards: [],
            creatures: [],
            spells: [],
            lands: [],
            sideboard: [],
            image: "https://upload.wikimedia.org/wikipedia/en/a/aa/Magic_the_gathering-card_back.jpg"
        }
        //this.changeImage = this.changeImage.bind(this, 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=94&type=card');
    }

    componentWillMount() {
            axios.get('http://localhost:8080/decks/' + this.props.match.params.deckId).then(result => {
            console.log(result.data);
            
            let tempArr = result.data[0].cards;
            let creatureArr = [];
            let spellArr = [];
            let landArr = [];
            let sideboardArr = [];

            for(let i = 0; i < tempArr.length; i++) {
                if(tempArr[i].sideboard) {
                    sideboardArr.push(tempArr[i]);
                } else if (tempArr[i].type.search('Creature') !== -1) {
                    creatureArr.push(tempArr[i]);
                } else if(tempArr[i].type.search('Land') !== -1) {
                    landArr.push(tempArr[i]);    
                } else {
                    spellArr.push(tempArr[i]);
                }
            }

            console.log(creatureArr);
            console.log(spellArr);
            console.log(landArr);
            console.log(sideboardArr);   

            this.setState({
                name: result.data[0].name,
                author: result.data[0].author,
                cards: result.data[0].cards,
                creatures: creatureArr,
                spells: spellArr,
                lands: landArr,
                sideboard: sideboardArr
            });
        });
    }

    changeImage = (image) => {
       this.setState({
           image: image
       }); 
    };

    buildRend = (stateArr) => {
        let rendArr = [];
        for(let i = 0; i < stateArr.length; i++) {
            rendArr.push(<CardViewer cardview={this.changeImage} props={stateArr[i]}/>);
        }
        return rendArr;
    }

  render() {
    return (
        <div classNameName="container">
            <div classNameName="page-header">
                <h1>{this.state.name}<small>  By: {this.state.author}</small></h1>
            </div>
            <div className="well">
                <div className="row">
                    <div className="col-md-3 col-lg-2">
                        <h3>Creatures</h3>
                            <ul>
                                {this.buildRend(this.state.creatures)}
                            </ul>
                        <h3>Spells</h3>
                            <ul>
                                {this.buildRend(this.state.spells)}
                            </ul>
                        <h3>Lands</h3>
                            <ul>
                                {this.buildRend(this.state.lands)}
                            </ul>
                    </div>
                    <div className="col-md-3 col-lg-2">
                        <h3>Sideboard</h3>
                            <ul>
                                {this.buildRend(this.state.sideboard)}
                            </ul>
                    </div>
                    <div className="col-lg-3">
                        <img id="cardviewer" src={this.state.image} />    
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default Decks;