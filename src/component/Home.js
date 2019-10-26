import React, { useState, useEffect, Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Searchbox from './SearchBox';
import Card from './Card';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '4em 1em',
    paddingBottom: '1em'
  },
}));

const HomeView = props => {
  const classes = useStyles();

  useEffect(() => {
    props.fetch_dashboardlist_data();
  }, []);
  return (
    <Container maxWidth="sm" className={classes.root}>
      <Searchbox />
      <Card />
    </Container>
  );
}

export default HomeView;
