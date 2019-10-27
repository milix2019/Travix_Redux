import {
    GET_NOTE_COMPLETED_DATA, GET_NOTE_RECEIEVE_DATA,
    CREATE_NOTE_RECEIEVE_DATA, CREATE_NOTE_COMPLETED_DATA,
    DELETE_NOTE_RECEIEVE_DATA, DELETE_NOTE_COMPLETED_DATA,
    UPDATE_NOTE_RECEIEVE_DATA, UPDATE_NOTE_COMPLETED_DATA
} from '../action/ActionConstant';

const initate_state = {
    //define state for Get_ALL
    loading_getnotes: true,
    getnotes: [],
    //Create Note
    loading_createnote: true,
    createnote: [],
    //Delete Note
    loading_delete: true,
    deletenote: [],
    //Update Note
    loading_update: true,
    updatenote: [],
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
        case DELETE_NOTE_RECEIEVE_DATA:
            return Object.assign({}, state, {
                ...state,
                loading_delete: true
            })
        case DELETE_NOTE_COMPLETED_DATA:
            return Object.assign({}, state, {
                ...state,
                loading_delete: false,
                deletenote: action.deletenote
            })
        case UPDATE_NOTE_RECEIEVE_DATA:
            return Object.assign({}, state, {
                ...state,
                loading_update: true
            })
        case UPDATE_NOTE_COMPLETED_DATA:
            return Object.assign({}, state, {
                ...state,
                loading_update: false,
                updatenote: action.updatenote
            })
        default:
            return state;
    }
}