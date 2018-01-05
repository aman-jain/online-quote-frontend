import React, {Component} from 'react';
import { connect } from 'react-redux';
import { loginAction } from '../../core-modules/actions/loginAction';
import style from './style.scss';
import Notification from '../../core-components/notification';

class Login extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            response:'',
            userName:'',
            password:'',
        }
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();
        this.props.login(this.state.userName, this.state.password);
    }
  
    render() {
        let response = this.props.response;
        let notificationResp = {
            status: 'none',
        }
        if(response && response === 'ok'){
            // response = 'Login Successfull'
            // responseStyle = 'success';
            this.props.history.goBack();
        } else if(response && response === 'fail'){
            notificationResp ={
                message: ['Login Failed'],
                status: 'error'
            }
        }  
         
        return (
            <div className="login_form_container">
                <div>
                    <h3> Enter your credentials </h3>
                    <hr />
                </div>  
                <Notification style={notificationResp.status} message={notificationResp.message}/>  
                <form onSubmit={this.handleSubmit}>
                    <div className="form_row">
                        <label htmlFor="userName">Enter User Name</label>
                        <input id="userName" name="userName" type="text" ref = "userName" onChange={this.handleChange}/>
                    </div>
                    <div className="form_row">
                        <label htmlFor="password">Enter Password</label>
                        <input id="password" ref = "password" name="password" type="text" onChange={this.handleChange}/>
                    </div>
                    <div className="form_row">
                        <button id="submit_button">Submit</button>
                    </div>
                </form>
            </div>    
      );
    }
  }
const mapStateToProps = (state) => {
    return {
        loggedIn: state.login.loggedIn,
        response: state.login.response,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (userName, password) => dispatch(loginAction(userName, password))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
