import React from 'react';
import style from './style.scss';
const Notification = (props) =>{
    if(!props || !props.message){
        return null;
    } else {
        const element = props.message.map((data, index)=>{
            return(
                <li key={index}>{data}</li>
            )
        })
        return (
            <div className={props.style}>
                <ul>
                  {element}
                </ul>    
            </div>
        );
    }
}

export default Notification;
