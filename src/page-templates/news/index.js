import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import style from './style.scss';
import Notification from '../../core-components/notification';
import config from '../../../config/base';

class News extends Component {
    constructor() {
        super();
        this.deleteNews = this.deleteNews.bind(this);
        this.state = {
            news: []
        }
        this.apiEndPoint = config.env.apiEndPoint;
    }
    deleteNews(event) {
        event.preventDefault();
        const data = {
            _id: event.target.id
        }
        axios({
            method: 'DELETE',
            url: `${this.apiEndPoint}/news`,
            data: data,
            headers: {
                'content-type': 'application/json',
            },
        })
        .then(results => {
            this.setState({
                news : results.data,
              });
        })
    }

    componentWillMount() {
        
        axios({
            method: 'GET',
            url: `${this.apiEndPoint}/news`,
            headers: {
                'content-type': 'application/json',
            },
        })
        .then(results => {
            this.setState({
                news : results.data,
              });
        })
    }
  
    render() { 
        const content = this.state.news.map((data, index) => {
            return(
                <tr key={index}>
                    <td>
                        {data.title}
                    </td>
                    <td>
                        {data.description}
                    </td>
                    <td className="alignRight">
                        <Link className="updbtn" to={`/addNews/${data._id}`}>Update News</Link>
                        <a href='#' className="delBtn" id={data._id} onClick={this.deleteNews}>Delete</a>
                    </td>
                </tr>    
            )
        }); 
        return (
            <div className="news_container"> 
                <div className="header">
                    <h2> Manage News </h2>
                </div>
                <div>
                    <Link className="addbtn" to={'/addNews'}>Add News</Link>
                </div>    
                <table>
                    <thead>
                        <tr>
                            <th>
                            Title
                            </th>
                            <th>
                            Description
                            </th>
                            <th>
                            Action
                            </th> 
                        </tr>
                    </thead>
                    <tbody>
                        {content}
                    </tbody>        
                </table>
            </div>    
      );
    }
  }

export default News;
