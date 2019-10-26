import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {HashRouter as Router} from 'react-router-dom';
import HomeView from './container/HomeContainer';
import Cookie from 'universal-cookie';
import Navbar from './component/Navbar';

// var json = {
//     token: {
//         "iss": "toptal.com",
//         "exp": "1426420800",
//         "company": "Toptal",
//         "awesome": "true"
//     }
// };
// new Cookies().set("token", json.token);

// const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route {...rest} render={(props) => (
//       new Cookie().get("token")
//         ? <Component {...props} />
//         : <Redirect to='/login' />
//     )} />
// );
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (<Component {...props} />)} />
);


class Routes extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Router>
                <Navbar />
                <Switch>
                    <PrivateRoute exact path="/" component={HomeView} />
                </Switch>
            </Router>
        )
    }
}

export default Routes;
