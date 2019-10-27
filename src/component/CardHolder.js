import React, { Component } from 'react';
import Cards from './Cards';
import Snackbar from './Snackbar';

class CardHolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      snackFlag: false,
      setTime: '',
      undo: false,
      hasAction: true
    }
  }
  componentDidMount() {
    this.props.fetch_getnotes_data();
  }
  componentWillReceiveProps(props) {
    if (props.createnote.length > 0) {
      var joined = props.getnotes.getnotes.concat(props.createnote[0]);
      this.setState({ notes: joined });
    } else {
      this.setState({ notes: props.getnotes.getnotes });
    }
  }
  onDelete = (index) => {
    let tt = setTimeout(() => { 
      var array = [...this.state.notes]; // make a separate copy of the array
      array.splice(index, 1); 
      if (index !== -1) {      
        this.setState({ 
          notes: array, 
          snackFlag: false
         });
      }
      console.log("delete"); 
    }, 5000);
        
    this.setState({ 
      setTime: tt, 
      snackFlag: true,
      undo: false
     });
  }
  onUndo = () => {
    console.log("onUndo");
    this.setState({ 
      snackFlag: false,
      undo: true
     });
     //clearning the setTimeout and undo the delete
     clearTimeout(this.state.setTime);
  }

  render() {
    return (
      <div>
        <Snackbar hasAction={this.state.hasAction} onUndo={this.onUndo} message={"Are you sure?"} snackFlag={this.state.snackFlag} />
        {this.state.notes.map((d, index) => {
          if (d != undefined)
            return <Cards id={index} undo={this.state.undo} onDelete={this.onDelete} key={index} {...d} />
        })}
      </div>
    );
  }
}

export default CardHolder;