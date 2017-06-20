import React from 'react';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';


export default class DeckDialog extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>
        <RaisedButton label="Scrollable Dialog" onTouchTap={this.handleOpen} />
        <Dialog
          title="Scrollable Dialog"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
            <List>
                <ListItem insetChildren={true} primaryText="Janet Perkins Bennet" />
                <ListItem insetChildren={true} primaryText="Peter Carlsson" />
                <ListItem insetChildren={true} primaryText="Aaron Bennet" />
                <ListItem insetChildren={true} primaryText="Abbey Christensen" />
            </List>
        </Dialog>
      </div>
    );
  }
}
