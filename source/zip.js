'use strict';

/**
* Create new one object from all arguments
* @param {object|object[]} 
* @returns {object}
*/

const zip = (...objects) => {
    const newObject = {};
    
    for (const obj of objects) {
        if (typeof obj === 'string') continue;
        
        for (const key in obj) {
            if ( !(key in newObject) ) {
                newObject[key] = obj[key];
            }
            else if (typeof newObject[key] === 'object'){
                 newObject[key] = zip(newObject[key], obj[key]);
            }
        }
    }
    return newObject;
};
