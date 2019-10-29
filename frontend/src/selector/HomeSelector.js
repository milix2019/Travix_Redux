import { createSelector } from 'reselect';

/* 
    I decided to use selectors because the state looks more cleaner,
    i only select the specific state and dispatch it to the Home components,
    calling will be done in homeContainer.js then dispatch to home.js,
    You can define the same flow/function for other states in future 
    and call it in the specific components holder
*/

export const getnotes = state => state.data
export const selected_getnotes = createSelector(
    getnotes,
    data => data
)    

//selector for create
export const selected_createnote = createSelector(
    getnotes,
    data => data.createnote // Selecting the state which you would like to have i.e data.getnotes
)