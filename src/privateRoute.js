import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class PrivateRouter extends Component {
    constructor(){
        super()
    }
    render(){
        if(!this.props.loggedIn){
            this.props.history.push('/login');
        }
        return(
            <section>
                {this.props.children}
            </section>    
        )
    }
} 
const mapStateToProps = (state) => {
    return {
        loggedIn: state.login.loggedIn,
    };
};

export default withRouter(connect(mapStateToProps)(PrivateRouter))

