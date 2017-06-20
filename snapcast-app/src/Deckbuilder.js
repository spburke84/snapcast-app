import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './App.css';
import CardEditor from './CardEditor';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DeckDialog from './DeckDialog';
import {List, ListItem} from 'material-ui/List';

import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';
import {Router, Route, browserHistory} from 'react-router';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const radioStyles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
};

const selectStyles = {
  customWidth: {
    width: 120,
  },
};


class Deckbuilder extends Component {
    constructor(props) {
    super(props);
    this.state = {
        newDeckOpen: false,
        disableSubmit: true,
        userNick: '',
        thisDeckId: '',
        thisDeckName: '',
        thisDeckFormat: '',
        thisDecklist: [],
        currUserDecks: '',
        changesNotSaved: false,
        disableAdd: true,
        open: false,
        loadOpen: false,
        quantityOpen: false,
        buttonText: 'Add Cards',
        completeCards: [],
        cardNames: [],
        imgUrl: "https://upload.wikimedia.org/wikipedia/en/a/aa/Magic_the_gathering-card_back.jpg",
        foundName: '',
        foundType: '',
        foundClassType: '',
        foundRarity: '',
        foundSet: '',
        foundText: '',
        foundImg: '',
        qtyValue: 1,
        qtySelected: 0,
        boardValue: 1,
        boardSelected: false
    };
  }

  componentWillMount() {
    axios.get('http://localhost:8080/cardSearch').then(result => {
        const tempData = result.data;
        this.setState({completeCards: tempData});

        let cardArr = tempData.map( i => {
            return i.name;
        });

        this.setState({
            cardNames: cardArr
        });
    });
    
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({
            userNick: profile.nickname
        });
      });
    } else {
      this.setState({ 
          userNick: userProfile.nickname });
    }
  }


    handleToggle = () => {
        this.setState({open: !this.state.open});

        if(this.state.buttonText === 'Add Cards') {
            this.setState({
                buttonText: 'Hide Search'
            });
        } else {
            this.setState({
                buttonText: 'Add Cards'
            });
        }
    }

    handleOpen = () => {
        this.setState({
            newDeckOpen: true,
            thisDeckFormat: 'Standard'
        });
    };

    handleCancel = () => {
        this.setState({
            newDeckOpen: false,
            disableSubmit: true,
            thisDeckFormat: '',
            thisDeckName: ''
        });
    };

    handleSubmit = () => {
        this.setState({
            newDeckOpen: false,
            thisDecklist: [],
            disableSubmit: true
        });
    };

    handleChange = (e) => {
        this.setState({
            disableSubmit: false,
            thisDeckName: e.target.value
        });
    }

    handleQuantity = (e) => {
        this.setState({
            disableAdd: false,
            qtySelected: e.target.value
        });
    }
    
    handleEditQuantity = (e) => {
        this.setState({
            disableQuantity: false,
            qtySelected: e.target.value
        });
    }

    handleLoadCancel = () => {
        this.setState({
            loadOpen: false
        });
    }

    radioChange = (e) => {
        this.setState({
            thisDeckFormat: e.target.value
        });
    }

    chooseQuantity = (e, i, value) => {
        let parsedVal = parseInt(value);

        this.setState({
            disableAdd: false,
            qtyValue: value,
            qtySelected: parsedVal
        });
    }

    addSelected = () => {
        let addCard = {
            card: this.state.foundName,
            qty: this.state.qtySelected,
            type: this.state.foundClassType,
            sideboard: this.state.boardSelected,
            image: this.state.imgUrl
        }
        let tempDeck = this.state.thisDecklist.concat([addCard]);
        tempDeck = tempDeck.sort(function(a,b) {
            if ( a.card < b.card )
                return -1;
            if ( a.card > b.card )
                return 1;
            return 0;
        });

        this.setState({
            thisDecklist: tempDeck,
            imgUrl: "https://upload.wikimedia.org/wikipedia/en/a/aa/Magic_the_gathering-card_back.jpg",
            foundName: '',
            foundType: '',
            foundClassType: '',
            foundRarity: '',
            foundSet: '',
            foundText: '',
            foundImg: '',
            qtyValue: 1,
            boardValue: 1,
            boardSelected: false
        });
    }

    handleSave = () => {
        let newDeck = ({
            name: this.state.thisDeckName,
            author: this.state.userNick,
            format: this.state.thisDeckFormat,
            cards: this.state.thisDecklist,
            isPublished: false
        });

        if(!this.state.thisDeckId) {
            axios.post('http://localhost:8080/save-deck', newDeck).then(result => {
                this.setState({
                    thisDeckId: result.data._id
                });
            });
        } else {
            newDeck._id = this.state.thisDeckId;
            let putUrl = 'http://localhost:8080/save-deck/' + this.state.thisDeckId;
            axios.put(putUrl, newDeck).then(result => {
            });
        }
        this.setState({
            changesNotSaved: false
        });
    }

    handleLoad = () => {
        let passUser = ({
            user: this.state.userNick
        });

        axios.post('http://localhost:8080/load', passUser).then(result => {
            this.setState({
                loadOpen: true,
                currUserDecks: result.data
            });
        });
    }

    chooseBoard = (e, i, value) => {
        let boardVal = false;

        if(value) {
            boardVal = true;
        }

        this.setState({
            boardValue: value,
            boardSelected: boardVal
        });
    }

    userDecks = () => {
        let userDecks = [];

        for(let j = 0; j < this.state.currUserDecks.length; j++) {
            userDecks.push(<ListItem insetChildren={true} primaryText={this.state.currUserDecks[j].name} onClick={()=>this.loadThisDeck(this.state.currUserDecks[j]._id)}/>);
        }
        return userDecks;
    }

    loadThisDeck = (id) => {
        axios.get('http://localhost:8080/decks/' + id)
             .then(result => {
                 this.setState({
                     thisDeckId: result.data[0]._id,
                     thisDeckName: result.data[0].name,
                     thisDeckFormat: result.data[0].format,
                     thisDecklist: result.data[0].cards,
                 });
             });
        this.setState({
            loadOpen: false
        });
    }

    editCard = (card) => {
        this.setState({
            quantityOpen: true
        });
        let tempDeck = this.state.thisDecklist;
        let tempCard = tempDeck[card];
        tempDeck.splice(card, 1);

        this.setState({
            foundName: tempCard.card,
            foundClasstype: tempCard.type,
            boardSelected: card.sideboard,
            imgUrl: card.image
        });
    }

    handleQtySubmit = () => {
        this.setState({
            quantityOpen: false
        });
        this.addSelected();
    }

    handleQuantityCancel = () => {
        this.setState({
            quantityOpen: false
        });
    }

    deleteCard = (card) => {
        let tempDeck = this.state.thisDecklist;
        tempDeck.splice(card, 1);
        this.setState({
            thisDecklist: tempDeck
        });
    }

    render() {
        
        const { isAuthenticated } = this.props.auth;
        let renderDecklist = [];

        for(let i =0; i < this.state.thisDecklist.length; i++) {
            renderDecklist.push(<CardEditor editCard={this.editCard} deleteCard={this.deleteCard} props={this.state.thisDecklist[i]} index={i}/>);
        }



        const createActions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleCancel}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                disabled={this.state.disableSubmit}
                onTouchTap={this.handleSubmit}
            />
        ];

        const quantityActions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleQuantityCancel}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                disabled={this.state.disableQuantity}
                onTouchTap={this.handleQtySubmit}
            />
        ];

        const loadActions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleLoadCancel}
            />
        ];
        return (
            <MuiThemeProvider>
                <div className="container">
                    <div className="row">
                        <div>
                            <RaisedButton
                                label='New Deck'
                                onTouchTap={this.handleOpen}
                            />
                            <Dialog
                                title="Create New Deck"
                                actions={createActions}
                                modal={true}
                                open={this.state.newDeckOpen}
                            >
                                <p>Deck Name:</p>
                                    <TextField
                                        hintText="New Deck"
                                        onChange = {this.handleChange}
                                    />
                                <p>
                                    Format:
                                    <RadioButtonGroup name="format" defaultSelected="Standard" onChange={this.radioChange}>
                                        <RadioButton
                                            value="Standard"
                                            label="Standard"
                                            style={radioStyles.radioButton}
                                        />
                                        <RadioButton
                                            value="Modern"
                                            label="Modern"
                                            style={radioStyles.radioButton}
                                        />
                                        <RadioButton
                                            value="Legacy"
                                            label="Legacy"
                                            style={radioStyles.radioButton}
                                        />
                                        <RadioButton
                                            value="Vintage"
                                            label="Vintage"
                                            style={radioStyles.radioButton}
                                        />
                                        <RadioButton
                                            value="Misc"
                                            label="'Back in my day...' Standard/Block Constructed"
                                            style={radioStyles.radioButton}
                                        />
                                    </RadioButtonGroup>
                                </p>
                            </Dialog>

                            <Dialog
                                title="Choose a Deck to Load:"
                                actions={loadActions}
                                modal={false}
                                open={this.state.loadOpen}
                                onRequestClose={this.handleClose}
                                autoScrollBodyContent={true}
                            >
                                <List>
                                    {this.userDecks()}
                                </List>
                            </Dialog>

                             <Dialog
                                title="Set new quantity:"
                                actions={quantityActions}
                                modal={false}
                                open={this.state.quantityOpen}
                                onRequestClose={this.handleClose}
                                autoScrollBodyContent={true}
                            >
                                <TextField
                                        hintText="Card Quantity"
                                        onChange = {this.handleEditQuantity}
                                    />
                            </Dialog>

                            <RaisedButton
                                label={this.state.buttonText}
                                onTouchTap={this.handleToggle}
                            />
                            { isAuthenticated() && (
                            <RaisedButton
                                label='Save'
                                onTouchTap={this.handleSave}
                            /> )}
                            { isAuthenticated() && (
                            <RaisedButton
                                label='Load'
                                onTouchTap={this.handleLoad}
                            /> )}
                            
                            
                    </div>
                   
                    <div className="row">
                        <h1>{this.state.thisDeckName}</h1>
                        <p>{this.state.thisDeckFormat}</p>
                        <div className="col-sm-9">
                            <div className="well">
                                {renderDecklist}
                            </div>
                        </div>
                    </div>
                    <div>
                        <Drawer width="28%" zDepth={2} openSecondary={true} open={this.state.open} >
                            <AppBar 
                                title="Card Search" 
                                onLeftIconButtonTouchTap={this.handleToggle}
                                iconElementLeft={<IconButton><NavigationClose /></IconButton>}
                            />
                                <div>
                                    <AutoComplete
                                        fullWidth={true}
                                        floatingLabelText="Search by card name"
                                        filter={AutoComplete.caseInsensitiveFilter}
                                        dataSource={this.state.cardNames}
                                        maxSearchResults={8}
                                        onNewRequest={(name, index) => {
                                            let foundCard = this.state.completeCards[index];
                        
                                            axios.get('http://localhost:8080/get-card/' + foundCard._id).then(result => {
                                                let tempCard = result.data;
                                            
                                                this.setState({
                                                    foundName: tempCard.name,
                                                    imgUrl: tempCard.imgUrl,
                                                    foundType: tempCard.cType,
                                                    foundClassType: tempCard.types,
                                                    foundRarity: tempCard.rarity,
                                                    foundSet: tempCard.xSet,
                                                    foundText: tempCard.text
                                                });
                                            });
                                            }
                                        }
                                    />
                                </div>
                                <div id='drawerBody' className='row'>
                                    <div className='col-sm-7'>
                                        <h3>{this.state.foundName}</h3>
                                        <p>{this.state.foundType}</p>
                                        <p>{this.state.foundRarity}</p>
                                        <p>{this.state.foundSet}</p>
                                        <p>{this.state.foundText}</p>
                                    </div>
                                    <div className='col-sm-5'>
                                        <img src={this.state.imgUrl}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className='col-sm-4'>
                                        <FlatButton
                                            label="Add Selected"
                                            primary={true}
                                            disabled={this.state.disableAdd}
                                            onTouchTap={this.addSelected}
                                        />
                                    </div>
                                    <div className='col-sm-8'>
                                        <p> <TextField
                                        hintText="Card Quantity"
                                        onChange = {this.handleQuantity}
                                    /></p>

                                        <p><SelectField
                                            floatingLabelText="Main Deck/Sideboard"
                                            value={this.state.boardValue}
                                            onChange={this.chooseBoard}
                                        >
                                            <MenuItem value={1} primaryText="Main Deck" />
                                            <MenuItem value={2} primaryText="Sideboard" />
                                        </SelectField></p>
                                    </div>
                                </div>
                        </Drawer>
                    </div>
                </div>
            </div>
        </MuiThemeProvider>
    );
  }
}

export default Deckbuilder;
