import React, { useState, useEffect, Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AddBox from './AddBox';
import CardHolder from './CardHolder';
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
  // useEffect(() => {
  //   props.fetch_getnotes_data();
  // }, []);
  
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
      // handle success
      setCreateData(response.data.result[0]);
    }).catch(function (error) {
      // handle error
      console.log(error);
    })
  }
  return (
    <Container maxWidth="sm" className={classes.root}>
      <AddBox createNote={(title,note) => { createNote(title,note) }} {...props} />
      <CardHolder createData={createData} {...props} />
    </Container>
  );
}

export default HomeView;
