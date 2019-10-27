import React, { useState, useEffect, Component } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
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
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
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
        top: "15px"
    },
    delete: {
        display: "none",
        position: 'absolute',
        right: '60px',
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
        flex: 1
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

const LightTooltip = withStyles(theme => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}))(Tooltip);

let _isOpen = false;

const Cards = props => {
    const classes = useStyles();

    const [placeholder, setPlaceholder] = useState("Take a note...");
    const [selected, setSelected] = useState(classes.root);
    const [isExpanded, setExpanded] = useState(false);
    const [readonly, setReadonly] = useState(true);
    const [title, setTitle] = useState(props.path);
    const [note, setNote] = useState(props.description);
    const [listToDelete, setListToDelete] = useState();


    useEffect(() => {
        _isOpen = false;
        
        if (props.undo && listToDelete) {
            listToDelete.d.style = "";
            listToDelete.dd.style = "";
            listToDelete.ddd.style = "";
            
            listToDelete.dd.style.animationName = "snackbar";
            listToDelete.dd.style["-webkit-animationName"] = "snackbar";
        }
    }, [props]);

    const onTitleClick = () => {
        if (!_isOpen) {
            setExpanded(!isExpanded);
        }
    };

    const onEditClick = (event) => {
        setSelected(classes.root + " fullscreen");
        document.getElementById("root").className = "selected";
        setReadonly(false);

        _isOpen = true;
        setExpanded(true);
    };

    const onCancelClick = (event) => {

        if (_isOpen) {
            console.log("update", title, note);
        }

        setSelected(classes.root);
        document.getElementById("root").className = "";
        setReadonly(true);

        _isOpen = false;
        setExpanded(false);
    };

    const onDelete = (event) => {
        let d = event.target.parentNode.parentNode;
        d.style.minHeight = 0;
        d.style.height = 0;

        setTimeout(() => {
            d.style.display = "none";
        }, 1000);

        let dd = d.parentNode;
        dd.style.minHeight = 0;
        dd.style.height = 0;
        dd.style.padding = 0;
        dd.style.margin = 0;
        dd.style.opacity = 0;

        let ddd = dd.parentNode;
        ddd.style.minHeight = 0;
        ddd.style.height = 0;
        ddd.style.padding = 0;
        ddd.style.margin = 0;
        ddd.style.display = "block";

        setListToDelete({d, dd, ddd});
        _isOpen = true;
        setExpanded(false);
        props.onDelete(props.id);
    }

    return (
        <div className={selected}>
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
                            placeholder={placeholder}
                            inputProps={{
                                'aria-label': 'title',
                                readOnly: readonly
                            }}
                            onChange={(e) => { setTitle(e.target.value) }}
                        />
                    </div>
                    <LightTooltip title="Delete task" placement="top">
                        <Icon onClick={(event) => { onDelete(event) }} className={classes.delete}>delete</Icon>
                    </LightTooltip>
                    <LightTooltip title="Edit task" placement="top">
                        <Icon className={classes.edit}
                            onClick={(event) => { onEditClick(event) }}>edit</Icon>
                    </LightTooltip>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.details}>
                    <div className={classes.column100}>
                        <textarea className={classes.textarea}
                            value={note}
                            readOnly={readonly}
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

export default Cards;