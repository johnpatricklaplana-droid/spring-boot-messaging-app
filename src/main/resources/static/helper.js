

export function validation (userInfo, validationrules = {}) {

     const errors = [];

     for(const key in userInfo) {

         const value = userInfo[key];

         if(!value) {
                errors.push(key);      
         }

         if(validationrules[key]) {
            if(validationrules[key].minLength && value.length < validationrules[key].minLength) {
                errors.push(key);
                
            }

            if(validationrules[key].matchField && value !== userInfo[validationrules[key].matchField]) {
                
                errors.push(key);
            }

            if(validationrules[key].pattern) {
                if(!validationrules[key].pattern.test(userInfo[key])) {
                errors.push(key);              
                }
            }
         }
     }
     return errors;
}