import React, { useState, useEffect, Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AddBox from './AddBox';
import CardHolder from './Card/CardHolder';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '4em 1em',
    paddingBottom: '1em',
    paddingTop: "5em"
  },
}));

const HomeView = props => {
  const classes = useStyles();
  const [createData, setCreateData] = useState([]);

  /* 
    Calling Ajax to create new Note,
    then update the state to re-render the page
  */
  const createNote = (title, note) => {
    axios.post('http://localhost:3003/api/tasks', {
      headers: {
        'content-type': 'application/json '
      }
    }, {
      data: {
        title: title,
        note: note
      }
    }).then(function (response) {
      // handle succes and update the states
      setCreateData(response.data.result[0]);
    }).catch(function (error) {
      // handle error
      console.log(error);
    })
  }
  return (
    <Container maxWidth="sm" className={classes.root}>
      <AddBox createNote={(title, note) => { createNote(title, note) }} {...props} />
      <CardHolder createData={createData} {...props} />
    </Container>
  );
}

export default HomeView;
