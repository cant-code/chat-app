const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterData(data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email: '';
    data.username = !isEmpty(data.username) ? data.username: '';
    data.password = !isEmpty(data.password) ? data.password: '';
    data.password2 = !isEmpty(data.password2) ? data.password2: '';

    if(Validator.isEmpty(data.email)) errors.email = 'Email field is required';
    else if(!Validator.isEmail(data.email)) errors.email = 'Invalid email field';

    if(Validator.isEmpty(data.username)) errors.username = 'Username field is required';

    if(!Validator.isLength(data.password, { min: 6, max: 30 })) {
        if(Validator.isEmpty(data.password)) errors.password = 'Password field is required';
        else errors.password = 'Password must be atleast 6 characters';
    }

    if(!Validator.equals(data.password, data.password2)) errors.password2 = 'Password must match';

    return {
        errors,
        isValid: isEmpty(errors)
    };
};