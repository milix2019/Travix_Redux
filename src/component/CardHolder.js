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
    // this.props.fetch_getnotes_data();
  }
  componentWillReceiveProps(props) {

    // TODO: 
    // check condition for
    //    delete, create, update & read
    // state is not updating !!


    console.log("deletenote::::", props);
    if (props.createnote) {
      var joined = props.getnotes.getnotes.concat(props.createnote);
      this.setState({ notes: joined });
    } else if (!props.loading_delete) {
      console.log("deletenote::::", props.deletenote);
    } else {
      this.setState({ notes: props.getnotes.getnotes });
    }
  }
  onDelete = (id) => {
    let tt = setTimeout(() => { 
      var array = [...this.state.notes]; // make a separate copy of the array

      var index;
      array.some(function (note, i) {
          return note.id === id ? (index = i, true) : false;
      });

      if (index != -1) {
        array.splice(index, 1); 
        this.setState({ 
          notes: array
         });
      };
      this.setState({ 
        snackFlag: false
       });
       console.log("this.state.notes::::", this.state.notes);
      this.props.delete_note(id);
    }, 2000);
    
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
  onUpdate = (id, title, note) => {
    console.log("onUpdate");
    this.props.update_note(id, title, note);
  }

  render() {
    return (
      <div>
        <Snackbar hasAction={this.state.hasAction} onUndo={this.onUndo} message={"Are you sure?"} snackFlag={this.state.snackFlag} />
        {this.state.notes.map((d, index) => {
          console.log("this.state::::", d);
          if (d != undefined)
            return <Cards id={d.id} undo={this.state.undo} onDelete={this.onDelete} onUpdate={this.onUpdate} key={index} {...d} />
        })}
      </div>
    );
  }
}

export default CardHolder;