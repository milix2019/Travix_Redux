import React, { useState, useEffect, Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Searchbox from './SearchBox';
import CardHolder from './CardHolder';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '4em 1em',
    paddingBottom: '1em',
    paddingTop: "5em"
  },
}));

const HomeView = props => {
  const classes = useStyles();
  // useEffect(() => {
  //   props.fetch_getnotes_data();
  // }, []);
  
  return (
    <Container maxWidth="sm" className={classes.root}>
      <Searchbox {...props} />
      <CardHolder {...props} />
    </Container>
  );
}

export default HomeView;
