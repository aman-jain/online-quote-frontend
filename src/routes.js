import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import News from './page-templates/news';
import NewsForm from './page-templates/news/newsForm';
import Quotes from './page-templates/quotes';
import Home from './page-templates/home';
import Login from './page-templates/login';
import NavBar from './core-components/navBar';
import PrivateRouter from './privateRoute';
/* eslint-disable react/prefer-stateless-function */
class Routes extends Component {
    
    render() {
        return (
            <Router>
                <div>
                    <h1>Welcome to Xavier</h1>
                    <h4>An online “quick quoting” system. Get a quick quote for private jet liability insurance on behalf of your clients.</h4>
                    <NavBar />
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/quotes' component={Quotes} />
                        
                        <PrivateRouter>
                            <Route exact path="/news" component={News}/>
                            <Route exact path='/addNews' component={NewsForm} />
                            <Route exact path='/addNews/:id' component={NewsForm} />
                        </PrivateRouter>
                    </Switch>
                </div>
            </Router>
        );
    }
}
export default Routes;
