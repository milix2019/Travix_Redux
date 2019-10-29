import { GET_NOTE_COMPLETED_DATA, GET_NOTE_RECEIEVE_DATA } from '../action/ActionConstant';

/* 
    Defining the initiate State to use in our components
*/

const initate_state = {
    loading_getnotes: true,
    getnotes: [],
}

export function get_notes_reducer(state = initate_state, action) {
    switch (action.type) {
        case GET_NOTE_RECEIEVE_DATA:
            return Object.assign({}, state, {
                ...state,
                loading_getnotes: true
            })
        case GET_NOTE_COMPLETED_DATA:
            return Object.assign({}, state, {
                ...state,
                loading_getnotes: false,
                getnotes: action.getnotes
            })
        default:
            return state;
    }
}