import React, { Component } from 'react';
import axios from 'axios';
import bannerImg from '../../assets/images/jet_img.jpg';
import styles from './style.scss';
import config from '../../../config/base';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            news: [],
        };
    }
    componentDidMount() {
        const apiEndPoint = config.env.apiEndPoint;
        axios({
            method: 'get',
            url: `${apiEndPoint}/news`,
            headers: {
                'content-type': 'application/json',
            },
        }).then((results) => {
            this.setState({
                news: results.data,
            });
        });
    }
    render() {
        const news = this.state.news.map((data, index) => {
            const dt = new Date(data.updatedAt);
            return (
                
                <div key={index}>
                    <h3>{data.title}</h3>
                    <h4>{data.description}</h4>
                    <h4>Published on:{`${dt.getMonth()+1}/${dt.getDate()}/${dt.getFullYear()}`}</h4>
                    <hr></hr>
                </div>
            )
        });
        return(

            <div> 
                <img className='banner' src={bannerImg} />
                <h2>Latest News From Xavier</h2>
                {news} 
            </div>        
        )
    }
}
export default Home;
