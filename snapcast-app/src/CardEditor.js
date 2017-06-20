import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CardEditor extends Component {
  constructor(props) {
      super(props);
      this.state = {
          qty: this.props.props.qty,
          type: this.props.props.type,
          sideboard: this.props.props.sideboard,
          image: this.props.props.image,
          card: this.props.props.card
      }
  }

      componentWillReceiveProps(nextProps) {
          this.setState({
              qty: nextProps.props.qty,
              type: nextProps.props.type,
              sideboard: nextProps.props.sideboard,
              image: nextProps.props.image,
              card: nextProps.props.card
          });
      }

    render() {

        return (
            <p>{this.state.qty}x {this.state.card}  <a onClick={() => this.props.editCard(this.props.index)}>Edit</a> | <a onClick={() => this.props.deleteCard(this.props.index)}>Delete</a></p>);
    }
}

export default CardEditor;