import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    cursor: "pointer",
    minWidth: 275,
    border: "1px solid transparent",
    '&:hover': {
      border: "1px solid #ccc",
    },
    '&:hover>span': {
      display: "block",
    },
  },
  edit: {
    display: "none",
    float: "right",
    margin: "12px 18px"
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  }
});

export default function SimpleCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.card} >
      <Icon className={classes.edit}>edit</Icon>
      <CardContent>
        <Typography variant="h6" component="h6" color="textSecondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
