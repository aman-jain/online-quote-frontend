import React, {Component} from 'react';
import axios from 'axios';
import style from './style.scss';
import Notification from '../../core-components/notification';
import validator from '../../utils/validator';
import quotesFormfields from './form.json';
import config from '../../../config/base';

class Quotes extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            response:'',
            ownerName:'',
            model:'',
            manufacturedDate:'',
            purchasePrice:'',
            seatCapacity:'',
            brokerEmail:'',
        }
    }
    handleChange(event) {
        this.setState({ [event.target.name] : event.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();
        const validation = validator(Object.assign({}, this.state), quotesFormfields);
        const apiEndPoint = config.env.apiEndPoint;
        if(validation.status) {
            const data = { 
                ownerName: this.state.ownerName, 
                model:this.state.model,
                manufacturedDate:this.state.manufacturedDate,
                seatCapacity: this.state.seatCapacity,
                purchasePrice:this.state.purchasePrice,
                brokerEmail: this.state.brokerEmail
            };

            axios({
                method: 'POST',
                data: data,
                url: `${apiEndPoint}/quotes`,
                headers: {
                    'content-type': 'application/json',
                },
            }).then(results => {
                console.log(results);
                if(!results.data.quotesData.error){
                    this.setState({
                        response : {
                            status: 'success',
                            message: [`Your calculated annual premium is: ${parseFloat(Math.round(results.data.quotesData.annual_premium * 100) / 100).toFixed(2)}`],
                        }    
                    });
                } else {
                    this.setState({
                        response : {
                            status: 'error',
                            message: [ `${results.data.quotesData.error}`],
                        }    
                    });
                }
                
            });
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
            <div className="quotes_container">
                <div>
                    <h3> Enter details of your jet to get free online quote </h3>
                    <hr />
                </div>    
                <Notification style={response.status} message={response.message}/>
                <form onSubmit={this.handleSubmit}>
                    <div className="form_row">
                        <label htmlFor="ownerName">Enter Owner Name</label>
                        <input id="ownerName" name="ownerName" data-validation="required" type="text" onChange={this.handleChange}/>
                    </div>
                    <div className="form_row">
                        <label htmlFor="model">Select Model</label>
                        
                        <select id="model" name="model" data-validation="required" onChange={this.handleChange}>
                            <option value='0'>Select...</option>
                            <option value="Gulfstream G650">Gulfstream G650</option>
                            <option value="Cessna A-37 Dragonfly">Cessna A-37 Dragonfly</option>
                            <option value="Cessna Citation Encore">Cessna Citation Encore</option>
                        </select>
                    </div>
                    <div className="form_row">
                        <label htmlFor="seatCapacity">Enter Seat Capacity</label>
                        <input id="seatCapacity" name="seatCapacity" type="text" data-validation="required" onChange={this.handleChange}/>
                    </div>
                    <div className="form_row">
                        <label htmlFor="manufacturedDate">Enter Manufactured Date</label>
                        <input id="manufacturedDate" name="manufacturedDate" type="text" data-validation="required" onChange={this.handleChange}/> 
                    </div> 
                    <div className="form_row">
                        <label htmlFor="purchasePrice">Enter Purchase Price</label>
                        <input id="purchasePrice" name="purchasePrice" type="text" data-validation="required" onChange={this.handleChange}/>
                    </div>
                    <div className="form_row">
                        <label htmlFor="brokerEmail">Email</label>
                        <input id="brokerEmail" name="brokerEmail" type="email" data-validation="required" onChange={this.handleChange}/>
                    </div>
                    <div className="form_row">
                        <button id="submit_button">Submit</button>
                    </div>
                </form>
            </div>    
        );
    }
  }

export default Quotes;
