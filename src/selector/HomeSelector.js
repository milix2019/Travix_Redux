import { createSelector } from 'reselect';

export const getnotes = state => state.data
//selector for get notes
export const selected_getnotes = createSelector(
    getnotes,
    data => data
)    

//selector for create
export const selected_createnote = createSelector(
    getnotes,
    data => data // you can define here , which part of the init reducer you would like to have i.e data.getnotes
)