import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import AddBox from './Addbox/AddBox';
import CardHolder from './Card/CardHolder';

const useStyles = makeStyles(() => ({
  root: {
    padding: '4em 1em',
    paddingBottom: '1em',
    paddingTop: "5em",
  },
}));

const HomeView = (props) => {
  const classes = useStyles();
  const [createData, setCreateData] = useState([]);

  /*
    Calling Ajax to create new Note,
    then update the state to re-render the page
  */
  const createNote = (title, note) => {
    axios.post('http://localhost:3003/api/tasks', {
      headers: {
        'content-type': 'application/json ',
      },
    }, {
      data: {
        title,
        note,
      },
    }).then((response) => {
      // handle succes and update the states
      setCreateData(response.data.result[0]);
    }).catch((error) => {
      // handle error
      console.log(error);
    });
  };
  return (
    <Container maxWidth="sm" className={classes.root} data-test="homeComponent">
      <AddBox createNote={(title, note) => { createNote(title, note); }} {...props} data-test="addboxComponent" />
      <CardHolder createData={createData} {...props} data-test="cardHolderComponent" />
    </Container>
  );
};

export default HomeView;
