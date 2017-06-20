import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CardViewer extends Component {
  constructor(props) {
      super(props);
      this.state = {
          qty: this.props.props.qty,
          image: this.props.props.image,
          card: this.props.props.card
      }

      console.log(this.props);
      console.log(this.props.props.card);
  }

    render() {
        
        return (
            <li onMouseEnter={() => this.props.cardview(this.state.image)}>{this.state.qty}x <a >{this.state.card}</a></li>);
    }
}

export default CardViewer;