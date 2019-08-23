let validator = require('validator');

exports.name= (name)=>{
    return validator.matches(name, /^.{1,15}/);
};

exports.password = (password)=>{
    return validator.matches(password, /^[\w~!@#$%^&*()_+.<>?\[\]{};\/]{8,21}$/g);
};
