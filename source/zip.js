'use strict';

/**
* Create new one object from all arguments
* @param {object|object[]} 
* @returns {object}
*/

const zip = (...objects) => {
    const newObject = {};
    
    for (const obj of objects) {
        for (const key in obj) {
            if ( !(key in newObject) ) {
                newObject[key] = obj[key];
            }  
        }
    }
    return newObject;
};
