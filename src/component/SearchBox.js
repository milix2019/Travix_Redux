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
import Snackbar from './Snackbar';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    paddingTop: '.7em',
    paddingBottom: '1.6em'
  },
  panel: {
    border: "2px solid #ccc",
    boxShadow: "0px 0px 4px 4px #cccccc52"
  },
  tick: {
    position: 'absolute',
    right: '20px',
    top: "15px"
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
    display: 'flex',
    flex: 1,
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
    display: 'flex',
    flex: 1,
    paddingRight: '4.4em'
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


const SearchBox = props => {
  // console.log("SearchBox", props);
  const classes = useStyles();

  const [isExpanded, setExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [titlePlaceholder, setTitlePlaceholder] = useState("Take a note...");
  const [snackFlag, setSnackFlag] = useState(false);

  // useEffect(() => {
  //   console.log("kir",props)
  // }, [props]);

  const makeNote = () => {
    // calling action from parents to create note
    props.create_node(title, note);
  };

  const onTitleClick = () => {
    setTitlePlaceholder("Title")
    setExpanded(true);
  };

  const onCancelClick = (event) => {
    // calling api to create note
    if (title && note) {
      makeNote();
    } else {
      setSnackFlag(true);
    }

    setTimeout(() => {
      setSnackFlag(false);
    }, 1000);

    setTitlePlaceholder("Take a note...");
    setTitle("");
    setNote("");
    setExpanded(false);
  };
  return (
    <div className={classes.root}>
      <Snackbar hasAction={false} message={"Make a note and give it a title..."} snackFlag={snackFlag} />
      <ExpansionPanel className={classes.panel}
        expanded={isExpanded}>
        <ExpansionPanelSummary
          aria-controls="panel1c-content"
          id="panel1c-header"
          onClick={(event) => { onTitleClick() }}
        >
          <div className={classes.column}>
            <InputBase
              value={title}
              className={classes.title}
              placeholder={titlePlaceholder}
              inputProps={{ 'aria-label': 'title' }}
              onChange={(e) => { setTitle(e.target.value) }}
            />
          </div>
          <Icon className={classes.tick}>check</Icon>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.column100}>
            <textarea className={classes.textarea}
              value={note}
              placeholder="Write here..."
              id="names"
              name="hard"
              rows={10}
              wrap="hard"
              onChange={(e) => { setNote(e.target.value) }}>
            </textarea>
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button size="small" onClick={(event) => { onCancelClick(event) }}>Close</Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
}

export default SearchBox;
// console.log(event.target.parentNode.parentNode.parentNode.parentNode);?