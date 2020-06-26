import _ from 'lodash';
import jsonPlaceholder from '../api/jsonPlaceholder';

//Action Creator
//Here we will make the API requests and return the action with the fetched data inside the 'payload' property
//We use Redux-Thunk to do that

/*WRONG APPROCH because async does not return always a PLAIN object 
export const fetchPosts = async () => {
    const response = await jsonPlaceholder.get('/posts');
    //Return an action
    return {
        type: 'FETCH_POSTS',
        payload: response
    };
};
*/

// We need to create an ASYNC action creator, this can be done only with a Middleware like Redux Thunk
//With Redux Thunk Action Creatos can return ALSO functions instead of the classic action objects
/*FULL CODE
export const fetchPosts = () => {
    return async function(dispatch, getState){
        
        const response = await jsonPlaceholder.get('/posts');
        //we call the dispatch directly when we have a response
        dispatch({            
                type: 'FETCH_POSTS',
                payload: response        
        })        
    }    
};
*/
/* SYNTHETIC CODE */
export const fetchPosts = () => async dispatch => {        
  const response = await jsonPlaceholder.get('/posts');  
  dispatch({ type: 'FETCH_POSTS', payload: response.data})
};

export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`);  
  dispatch({ type: 'FETCH_USER', payload: response.data})
}

//Possible solution using MEMOIZING function from Lodash library (to fetch each user only one like a sort of caching)
/*
export const fetchUser = id => dispatch => _fetchUser(id, dispatch);
const _fetchUser = _.memoize(async (id,dispatch) => {
  const response = await jsonPlaceholder.get(`/users/${id}`);  
  dispatch({ type: 'FETCH_USER', payload: response.data})
});
*/

//Another solution to this overfetching is to create a fetchPostsAndUsers() action creator

//We can still have others action creator that returns normal action objects
export const fetchPostsAndUsers = () => async (dispatch, getState) => {  
  //console.log("Fetching the posts...");
  await dispatch( fetchPosts() ); //await to make sure that we wait to the API request have been completed before move on 
  //console.log("Fetched!");  //into getState().posts;

  //const userIds = _.uniq(_.map(getState().posts, 'userId'));  //uniq and map are lodash functions
  //userIds.forEach(id => dispatch(fetchUser(id)));  //Here we do not care to wait

  //nice alternative with lodash
  _.chain(getState().posts)
    .map('userId')
    .uniq()
    .forEach(id => dispatch(fetchUser(id)))
    .value() //execute
};