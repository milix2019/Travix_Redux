import React, { useState, useEffect } from 'react';
import PropTypes, { number } from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
  ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, ExpansionPanelActions,
  Icon, Button, Divider, InputBase, Tooltip,
} from '@material-ui/core';

/*
  This container will make the cards based on the parents state,
  here we receive the data as props and start building them
*/

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    paddingBottom: '8px',
  },
  panel: {
    border: "1px solid transparent",
    '&:hover': {
      cursor: "pointer",
      border: "1px solid #ccc",
    },
    '&:hover>div>div>span': {
      display: "block",
    },
  },
  edit: {
    display: "none",
    position: 'absolute',
    right: '20px',
    top: "15px",
  },
  delete: {
    display: "none",
    position: 'absolute',
    right: '60px',
    top: "15px",
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
    paddingRight: '4.4em',
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
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
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

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);

let _isSnackOpen = false;

const Cards = (props) => {
  const classes = useStyles();

  const [selected, setSelected] = useState(classes.root);
  const [isExpanded, setExpanded] = useState(false);
  const [readonly, setReadonly] = useState(true);
  const [title, setTitle] = useState(props.title);
  const [note, setNote] = useState(props.note);
  const [toDo, setToDo] = useState(null);


  const clearStyle = (elems) => {
    let index = 0;
    const length = elems.length;

    for (; index < length; index++) {
      elems[index].style = "";
    }
  };
  useEffect(() => {
    /*
      The logic of Collapsing, adding the style, blinking the cards (color), readonly
      is being done based on the various flags that we have defined from parents,
      then in this section we control it and make it happen
    */
    _isSnackOpen = false;

    setTitle(props.title);
    setNote(props.note);

    if (toDo) {
      let timer;
      document.getElementById("root").className = "";
      clearStyle(document.querySelectorAll("#root > div:nth-child(2) > div:nth-child(2) > div"));
      clearStyle(document.querySelectorAll("#root > div:nth-child(2) > div:nth-child(2) > div > div"));
      clearStyle(document.querySelectorAll("#root > div:nth-child(2) > div:nth-child(2) > div > div > div"));
      toDo.style.animationName = "snackbar";
      toDo.style["-webkit-animationName"] = "snackbar";
      setToDo();
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        clearStyle(document.querySelectorAll("#root > div:nth-child(2) > div:nth-child(2) > div > div"));
      }, 1000);
    }
  }, [props]);


  const onTitleClick = () => {
    if (!_isSnackOpen) {
      setExpanded(!isExpanded);
    }
  };

  const onEditClick = () => {
    setSelected(`${classes.root} fullscreen`);
    document.getElementById("root").className = "selected";
    setReadonly(false);

    _isSnackOpen = true;
    setExpanded(true);
  };

  const onCancelClick = (event) => {
    if (_isSnackOpen && (props.title !== title || props.note !== note)) {
      // eslint-disable-next-line max-len
      setToDo(event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode);
      props.onUpdate(props.id, title, note);
    }
    _isSnackOpen = false;
    document.getElementById("root").className = "";
    setSelected(classes.root);
    setReadonly(true);
    setExpanded(false);
  };

  const onDelete = (event) => {
    _isSnackOpen = true;
    setToDo(event.target.parentNode.parentNode.parentNode);
    setExpanded(false);
    props.onDelete(props.id);
  };

  return (
    <div className={selected}>
      <ExpansionPanel className={classes.panel} expanded={isExpanded}>
        <ExpansionPanelSummary
          aria-controls="panel1c-content"
          id="panel1c-header"
          onClick={() => { onTitleClick(); }}
        >
          <div className={classes.column}>
            <InputBase
              value={title}
              className={classes.title}
              inputProps={{
                'aria-label': 'title',
                readOnly: readonly,
              }}
              onChange={(e) => { setTitle(e.target.value); }}
            />
          </div>
          <LightTooltip title="Delete task" placement="top">
            <Icon onClick={(event) => { onDelete(event); }} className={classes.delete}>delete</Icon>
          </LightTooltip>
          <LightTooltip title="Edit task" placement="top">
            <Icon className={classes.edit} onClick={(event) => { onEditClick(event); }}>edit</Icon>
          </LightTooltip>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.column100}>
            <textarea
              className={classes.textarea}
              value={note}
              readOnly={readonly}
              placeholder="Write here..."
              id="names"
              name="hard"
              rows={10}
              wrap="hard"
              onChange={(e) => { setNote(e.target.value); }}
            />
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button size="small" onClick={(event) => { onCancelClick(event); }}>Close</Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
};

Cards.propTypes = {
  title: PropTypes.string,
  note: PropTypes.string,
  id: PropTypes.number,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
};

Cards.defaultProps = {
  title: null,
  note: null,
  id: number,
  onUpdate: () => {},
  onDelete: () => {},
};

export default Cards;
