import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import HomeView from './container/HomeContainer';
import Navbar from './component/Nav/Navbar';

class Routes extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <BrowserRouter>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={HomeView} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Routes;
