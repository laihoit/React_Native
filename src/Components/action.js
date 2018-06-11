import lodash from 'lodash';

export function addPropertyToCollection(collection, prop){
    return lodash.map(collection, function(element) { 
        return lodash.extend({}, element, prop);
   });
}