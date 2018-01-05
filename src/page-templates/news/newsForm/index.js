import React, {Component} from 'react';
import axios from 'axios';
import style from './style.scss';
import Notification from '../../../core-components/notification';
import formFields from './form.json';
import validator from '../../../utils/validator';
import config from '../../../../config/base';

class NewsForm extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            response:'',
            title:'',
            description:'',
        }
        this.apiEndPoint = config.env.apiEndPoint;
    }
    componentWillMount(){
        
        if(this.props.match.params) {
            const id = this.props.match.params.id;
            if(id){
                axios({
                    method: 'GET',
                    url: `${this.apiEndPoint}/news/${id}`,
                    headers: {
                        'content-type': 'application/json',
                    },
                })
                .then((results) => {
                    this.refs.title.value = results.data[0].title;
                    this.refs.description.value = results.data[0].description;
                    this.setState({
                        id: results.data[0]._id,
                        title: results.data[0].title,
                        description: results.data[0].description
                    })
                })
            }
        }
        
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();
        const validation = validator(Object.assign({},this.state), formFields);
        if(validation.status){
            let method = 'POST';
            const data = { 
                title: this.state.title, 
                description:this.state.description,
            };
            if(this.state.id){
                data.id = this.state.id;
                method = 'PUT';
            }   
            axios({
                method: method,
                data: data,
                url: `${this.apiEndPoint}/news`,
                headers: {
                    'content-type': 'application/json',
                },
            })
            .then(results => {
                this.setState({
                    response : {
                        status: 'success',
                        message: ['News Posted Successfully'],
                    }
                });
            })
        } else {
            this.setState({
                response : {
                    message: validation.errorMessages,
                    status: 'error'
                },
            });
        }
        window.scrollTo(0, 0);
    }
  
    render() { 
        let response = this.state.response;

        return (
            <div className="news_form_container">
                <div>
                    <h3> Enter new News item </h3>
                    <hr />
                </div>    
                <Notification style={response.status} message={response.message}/>
                <form onSubmit={this.handleSubmit}>
                    <div className="form_row">
                        <label htmlFor="title">Enter Title</label>
                        <input id="title" name="title" type="text" ref = "title" onChange={this.handleChange}/>
                    </div>
                    <div className="form_row">
                        <label htmlFor="description">Enter Description</label>
                        <textarea rows="4" cols="20" id="description" ref = "description" name="description" onChange={this.handleChange}/>
                    </div>
                    <div className="form_row">
                        <button id="submit_button">Submit</button>
                    </div>
                </form>
            </div>    
        );
    }
  }

export default NewsForm;
