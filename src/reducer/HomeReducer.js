import { GET_NOTE_COMPLETED_DATA, GET_NOTE_RECEIEVE_DATA, CREATE_NOTE_RECEIEVE_DATA, CREATE_NOTE_COMPLETED_DATA } from '../action/ActionConstant';

const initate_state = {
    //define state for Get_ALL
    loading_getnotes: true,
    getnotes: [],
    //define state for Create Note
    loading_createnote: true,
    createnote: [],
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
        case CREATE_NOTE_RECEIEVE_DATA:
            return Object.assign({}, state, {
                ...state,
                loading_createnote: true
            })
        case CREATE_NOTE_COMPLETED_DATA:
            return Object.assign({}, state, {
                ...state,
                loading_createnote: false,
                createnote: action.createnote
            })
        default:
            return state;
    }
}