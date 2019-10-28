import React, { Component } from 'react';
import Cards from './Cards';
import Snackbar from './Snackbar';
import axios from 'axios';
import SearchBox from './SearchBox';


class CardHolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      notesSearch: [],
      textToSearch: "",
      snackFlag: false,
      setTime: '',
      hasAction: true
    }
  }
  componentDidMount() {
    this.props.fetch_getnotes_data();
  }
  componentWillReceiveProps(props) {

    // TODO: 
    // check condition for
    //    delete, create, update & read
    // state is not updating !!


    if (props.createData.length != 0) {
      console.log("iff");
      var joined = this.state.notes.concat(props.createData);
      this.setState({ notes: joined });
    } else {
      console.log("elsee");
      this.setState({ notes: props.getnotes.getnotes });
    }
  }
  onDelete = (id) => {
    let timer = setTimeout(() => {
      var array = [...this.state.notes]; // make a separate copy of the array

      var index;
      array.some(function (note, i) {
        return note.id === id ? (index = i, true) : false;
      });

      if (index != -1) {
        this.deleteNote(id).then(res => {
          if (res.success) {
            array.splice(index, 1);
            this.setState({
              notes: array
            });
          }
        }).catch(function (error) {
          // handle error
          console.log(error);
        })
      };
      this.setState({
        snackFlag: false
      });
      //this.props.delete_note(id);
    }, 2000);

    this.setState({
      setTime: timer,
      snackFlag: true
    });
  }
  deleteNote = async (id) => {
    let res = await axios.delete(`http://localhost:3003/api/tasks/` + id);
    return res.data;
  };
  onUndo = () => {
    console.log("onUndo");
    this.setState({
      snackFlag: false,
      deleted: false
    });
    //clearning the setTimeout and undo the delete
    clearTimeout(this.state.setTime);
  }
  onUpdate = (id, title, note) => {
    console.log("onUpdate");
    var array = [...this.state.notes]; // make a separate copy of the array
    var index;
    array.some(function (note, i) {
      return note.id === id ? (index = i, true) : false;
    });

    let that = this;

    this.updateNote(id, title, note).then(function (res) {
      array[index].title = title;
      array[index].note = note;
      that.setState({
        notes: array
      });
    }).catch(function (error) {
      // handle error
      console.log(error);
    })
  }
  updateNote = async (id, title, note) => {
    let res = await axios.put(`http://localhost:3003/api/tasks/` + id, {
      headers: {
        'content-type': 'application/json '
      }
    }, {
      data: {
        title: title,
        note: note
      }
    });
    return res.data;
  };
  onSearch = (event) => {
    console.log("onSearch", event.target.value);

    var textToSearch = event.target.value;
    var array = [...this.state.notes].filter((note) => { return textToSearch.length === 0 || note.title.includes(textToSearch) || note.note.includes(textToSearch); });
    console.log(array);
    
    this.setState({
      notesSearch: array,
      textToSearch: textToSearch
    });
  };

  render() {
    const data = this.state.textToSearch.length == 0 && this.state.notesSearch.length === 0 ? this.state.notes: this.state.notesSearch;    
    return (
      <div>
        <SearchBox onSearch={this.onSearch} />
        <Snackbar hasAction={this.state.hasAction} onUndo={this.onUndo} message={"Are you sure?"} snackFlag={this.state.snackFlag} />
        { data != undefined &&
          data.length > 0 &&
          data.map((d, index) => {
            if (d != undefined)
              return <Cards id={d.id} onDelete={this.onDelete} onUpdate={this.onUpdate} key={index} {...d} />
          })}
      </div>
    );
  }
}

export default CardHolder;