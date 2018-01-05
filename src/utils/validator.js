'use strict';
import moment from 'moment';

function validateEmail(id, data){
    const emailValid = data.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    return  emailValid ? null: `${id} is invalid`; 
}
function validateRequire(id, data){
    console.log(data);
    if(!data || (data && data ==='')){
        return `${id} is required.`;
    }
    return null;
} 
function validateDate(id, data){
    const aDate = moment(data, 'MM/DD/YYY', true);
    return  aDate.isValid() ? null: `${id} is invalid. Please enter in MM/DD/YYYY format.`;
}
function validateNumeric(id, data){
    return /^\+?(0|[1-9]\d*)$/.test(data)? null: `Please enter a number value for ${id}`;
}
export default (formData, formFields) =>{
    const keys = Object.keys(formFields);
    const validation = {
        errorMessages:[],
        status: true,
    }
    keys.forEach(key => {
        if(formFields[key].required){
            const errMessage = validateRequire(formFields[key].id, formData[key]);
            if(errMessage){
                validation.errorMessages.push(errMessage);
                validation.status = false;
            }
        }
        let error;
        switch (formFields[key].validation){
        case "email":
            error = validateEmail(formFields[key].id, formData[key]);
            break;
        case "date":
            error = validateDate(formFields[key].id, formData[key]);
            break;
        case "numeric":
            error = validateNumeric(formFields[key].id, formData[key]);
            break;        
        default:
            break;    
        }
        if(error){
            validation.errorMessages.push(error);
            validation.status = false;
        }       
    });
    return validation;
}
