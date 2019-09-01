'use strict';

/**
* Create new one object from all arguments
* @param {object|object[]} 
* @returns {object}
*/

const zip = (...objects) => {
    const newObject = {};
    
    for (let obj of objects) {
        if (typeof(obj) === 'string') continue;
        
        for (let key in obj){
            if ( !(key in newObject) ) {
                newObject[key] = obj[key];
            }  
        }
    }
    
    return newObject;
};
