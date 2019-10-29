import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    close: {
        padding: theme.spacing(0.5),
    },
}));

/* 
    This is the shared (dynamic) component layout which being calling in afew part of the code
    which is for OnDelete the note and give notification if its empty
*/
const Snack = props => {
    const queueRef = React.useRef([]);
    const [open, setOpen] = React.useState(false);
    const [messageInfo, setMessageInfo] = React.useState(undefined);

    useEffect(() => {
        if (props.snackFlag) {
            let message = props.message;
            queueRef.current.push({
                message,
                key: new Date().getTime(),
            });

            if (open) {
                // immediately begin dismissing current message
                // to start showing new one
                setOpen(false);
            } else {
                processQueue();
            }
        } else {
            setOpen(false);
        }
    }, [props]);

    const processQueue = () => {
        if (queueRef.current.length > 0) {
            setMessageInfo(queueRef.current.shift());
            setOpen(true);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleExited = () => {
        processQueue();
    };

    const classes = useStyles();
    return (
        <div>
            <Snackbar
                key={messageInfo ? messageInfo.key : undefined}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                onExited={handleExited}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{messageInfo ? messageInfo.message : undefined}</span>}
                action={props.hasAction && [
                    <Button key="undo" color="secondary" size="small" onClick={props.onUndo}>
                        UNDO
                    </Button>,
                ]}
            />
        </div>
    );
}

export default Snack;