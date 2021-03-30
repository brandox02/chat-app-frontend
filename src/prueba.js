import {
     ADD_TODO_SUCCESS,
     ADD_TODO_FAILURE,
     ADD_TODO_STARTED,
     DELETE_TODO
   } from './types';
   
   import axios from 'axios';
   
   export const addTodo = ({ title, userId }) => {
     return dispatch => {
       dispatch(addTodoStarted());
   
       axios
         .post(`https://jsonplaceholder.typicode.com/todos`, {
           title,
           userId,
           completed: false
         })
         .then(res => {
           dispatch(addTodoSuccess(res.data));
         })
         .catch(err => {
           dispatch(addTodoFailure(err.message));
         });
     };
   };
   
   const addTodoSuccess = todo => ({
     type: ADD_TODO_SUCCESS,
     payload: {
       ...todo
     }
   });
   
   const addTodoStarted = () => ({
     type: ADD_TODO_STARTED
   });
   
   const addTodoFailure = error => ({
     type: ADD_TODO_FAILURE,
     payload: {
       error
     }
   });