import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Cards from './Cards';
import Snackbar from '../Snackbar';
import SearchBox from '../SearchBox';

/*
  This is container which hold afew things,
  Card Holder, Cards and Toster (Snakbar),
  the magic being done in Card,
  which We pass all the data to the components and we build the cards there
*/

class CardHolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      notesSearch: [],
      textToSearch: "",
      snackFlag: false,
      setTime: '',
      hasAction: true,
    };
  }

  componentDidMount() {
    /*
      Calling Ajax (as props from parent) to Fetch all notes and update store
    */
    this.props.fetch_getnotes_data();
  }

  componentWillReceiveProps(props) {
    /*
      If any new note has been created,
      here will be fired , then we append the create note and update the state
    */
    if (props.createData.length !== 0) {
      const joined = [props.createData, ...this.state.notes];
      this.setState({ notes: joined });
    } else {
      this.setState({ notes: props.getnotes.getnotes });
    }
  }

  onDelete = (id) => {
    const timer = setTimeout(() => {
      const array = [...this.state.notes]; // make a separate copy of the array

      let index;
      array.some((note, i) => {
        return note.id === id ? (index = i, true) : false;
      });

      if (index !== -1) {
        this.deleteNote(id).then((res) => {
          if (res.success) {
            array.splice(index, 1);
            this.setState({
              notes: array,
            });
          }
        }).catch((error) => {
          // handle error
          console.log(error);
        });
      }

      this.setState({
        snackFlag: false,
      });
    }, 2000);

    this.setState({
      setTime: timer,
      snackFlag: true,
    });
  }
  /*
    Calling async Axios in order to wait until the note has been deleted,
    then we will update the state
  */

  deleteNote = async (id) => {
    const res = await axios.delete(`http://localhost:3003/api/tasks/${id}`);
    return res.data;
  };

  onUndo = () => {
    this.setState({
      snackFlag: false,
    });
    // clearning the setTimeout and undo the delete
    clearTimeout(this.state.setTime);
  }

  onUpdate = (id, title, note) => {
    const array = [...this.state.notes]; // make a separate copy of the array
    let index;
    array.some((n, i) => {
      // eslint-disable-next-line no-return-assign
      return n.id === id ? (index = i, true) : false;
    });

    const that = this;

    this.updateNote(id, title, note).then(() => {
      array[index].title = title;
      array[index].note = note;
      that.setState({
        notes: array,
      });
    }).catch((error) => {
      // handle error
      console.log(error);
    });
  }
  /*
    Update the Notes , then we will update the state
  */

  updateNote = async (id, title, note) => {
    const res = await axios.put(`http://localhost:3003/api/tasks/${id}`, {
      headers: {
        'content-type': 'application/json',
      },
    }, {
      data: {
        title: title,
        note: note,
      },
    });
    return res.data;
  };

  onSearch = (event) => {
    const textToSearch = event.target.value;
    const array = [...this.state.notes].filter((note) => {
      return textToSearch.length === 0
      || note.title.includes(textToSearch)
      || note.note.includes(textToSearch);
    });
    this.setState({
      notesSearch: array,
      textToSearch: textToSearch,
    });
  };

  render() {
    const data = this.state.textToSearch.length === 0
    && this.state.notesSearch.length === 0 ? this.state.notes : this.state.notesSearch;
    return (
      <div>
        <SearchBox onSearch={this.onSearch} />
        <Snackbar hasAction={this.state.hasAction} onUndo={this.onUndo} message="Are you sure?" snackFlag={this.state.snackFlag} />
        { data !== undefined
        && data.length > 0
        && data.map((d) => {
          if (d !== undefined) {
            // eslint-disable-next-line max-len
            return <Cards id={d.id} onDelete={this.onDelete} onUpdate={this.onUpdate} key={d.id} {...d} />;
          }
        })}
      </div>
    );
  }
}

CardHolder.propTypes = {
  fetch_getnotes_data: PropTypes.func,
  createData: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    note: PropTypes.string,
  })),
  getnotes: PropTypes.any,
};

CardHolder.defaultProps = {
  fetch_getnotes_data: null,
  createData: null,
  getnotes: null,
};
export default CardHolder;
