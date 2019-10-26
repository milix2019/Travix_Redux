import React, { useState, useEffect, Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    padding: '1em 0'
  },
  tick: {
    position: 'absolute',
    right: '20px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  title: {
    fontSize: "1.25rem",
    fontWeight: "500",
    lineHeight: "1.6",
    letterSpacing: "0.0075em",
    color: "rgba(0, 0, 0, 0.54)",
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  column100: {
    width: '100%',
  },
  textarea: {
    border: 'none',
    outline: 'none',
    width: '100%',
    height: '100%',
    resize: 'none',
    fontSize: "0.875rem",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif"
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

export default function DetailedExpansionPanel() {
  const [titlePlaceholder, setTitlePlaceholder] = useState("Take a note...");

  const classes = useStyles();

  const onSetTitlePlaceholder = (event, expanded) => {
    expanded ? setTitlePlaceholder("Title") : setTitlePlaceholder("Take a note...");
  };

  return (
    <div className={classes.root}>
      <ExpansionPanel onChange={(event, expanded) => { onSetTitlePlaceholder(event, expanded) }} >
        <ExpansionPanelSummary
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <InputBase
              className={classes.title}
              placeholder={titlePlaceholder}
              inputProps={{ 'aria-label': 'title' }}
            />
          </div>
          <Icon className={classes.tick}>check</Icon>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.column100}>
            <textarea className={classes.textarea}
              placeholder="Write here..."
              id="names"
              name="hard"
              rows={10}
              onChange={() => { }}
              wrap="hard">
            </textarea>
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button size="small">Cancel</Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
}
