import React, { useEffect } from 'react';
import { Button, Snackbar } from '@material-ui/core';
import PropTypes from 'prop-types';

/*
    This is the shared (dynamic) component layout which being calling in afew part of the code
    which is for OnDelete the note and give notification if its empty
*/
const Snack = (props) => {
  const { hasAction, onUndo } = props;
  const queueRef = React.useRef([]);
  const [open, setOpen] = React.useState(false);
  const [messageInfo, setMessageInfo] = React.useState(undefined);

  const processQueue = () => {
    if (queueRef.current.length > 0) {
      setMessageInfo(queueRef.current.shift());
      setOpen(true);
    }
  };
  useEffect(() => {
    if (props.snackFlag) {
      const { message } = props;
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


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    processQueue();
  };

  return (
    <div>
      <Snackbar
        style={{ zIndex: "9999999" }}
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
        action={hasAction && [
          <Button key="undo" color="secondary" size="small" onClick={onUndo}>
            UNDO
          </Button>,
        ]}
      />
    </div>
  );
};

Snack.propTypes = {
  snackFlag: PropTypes.bool,
  message: PropTypes.string,
  hasAction: PropTypes.bool,
  onUndo: PropTypes.func,
};

Snack.defaultProps = {
  snackFlag: null,
  message: null,
  hasAction: null,
  onUndo: () => {},
};

export default Snack;
