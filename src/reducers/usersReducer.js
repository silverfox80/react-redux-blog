export default (state = [], action) => {
    switch (action.type) {
        case 'FETCH_USER':
            return [...state,action.payload];
        default:
            return state;
    }
}

//CONVENTION: DO NOT MUTATE the state EVER
//const colors = ['red','green'];
//[...colors,'blue']   instead of colors.push('blue')
//
//colors.filter(color => color !== 'green')
//this will remove the 'green' from the array instead of using colors.pop() for example
//
//const profile = { name:'Sam'}
//{...profile, name:'Alex'}   instead of profile['name']='Alex'
// _.omit(profile,'name') will remove the property
//
//This always return a brand new array, so does not MUTATE the array/object
