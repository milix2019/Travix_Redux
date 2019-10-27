import React, { Component } from 'react';
import Cards from './Cards';
import Snackbar from './Snackbar';

class CardHolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      snackFlag: false
    }
  }
  componentDidMount() {
    this.props.fetch_getnotes_data();
  }
  componentWillReceiveProps(props) {
    if (props.createnote.createnote.length > 0) {
      var joined = props.getnotes.getnotes.concat(props.createnote.createnote[0]);
      this.setState({ notes: joined });
    } else {
      this.setState({ notes: props.getnotes.getnotes });
    }
  }
  onDelete = (index) => {
    var array = [...this.state.notes]; // make a separate copy of the array
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ 
        notes: array, 
        snackFlag: true
       });
    }
  }
  onUndo = () => {
    console.log("onUndo");
    this.setState({ 
      snackFlag: false
     });
  }

  render() {
    return (
      <div>
        <Snackbar onUndo={this.onUndo} snackFlag={this.state.snackFlag} />
        {this.state.notes.map((d, index) => {
          if (d != undefined)
            return <Cards id={index} onDelete={this.onDelete} key={index} {...d} />
        })}
      </div>
    );
  }
}

export default CardHolder;