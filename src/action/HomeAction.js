import { get, post } from 'axios';
import {
    GET_NOTE_RECEIEVE_DATA, GET_NOTE_COMPLETED_DATA,
    CREATE_NOTE_RECEIEVE_DATA, CREATE_NOTE_COMPLETED_DATA,
    DELETE_NOTE_RECEIEVE_DATA, DELETE_NOTE_COMPLETED_DATA,
    UPDATE_NOTE_RECEIEVE_DATA, UPDATE_NOTE_COMPLETED_DATA
} from './ActionConstant'


/* This Section is for getting all the data */
function request_getnotes_data() {
    return {
        type: GET_NOTE_RECEIEVE_DATA
    }
}

function receive_getnotes_data(data) {
    return {
        type: GET_NOTE_COMPLETED_DATA,
        getnotes: data
    }
}

export function fetch_getnotes_data(d) {
    return function (dispatch) {
        dispatch(request_getnotes_data())
        return get(`https://api.openaq.org/v1/`).then(
            response => dispatch(receive_getnotes_data(response.data.results)),
            error => console.log("fail ajax on home page", error)
        )
    }
}

/* This Section is for Create the Note */
function request_create_notes_data() {
    return {
        type: CREATE_NOTE_RECEIEVE_DATA
    }
}

function receive_create_notes_data(data) {
    return {
        type: CREATE_NOTE_COMPLETED_DATA,
        createnote: data
    }
}

export function crete_note(d) {
    return function (dispatch) {
        dispatch(request_create_notes_data())
        return get(`https://api.openaq.org/v1/`).then(
            response => dispatch(receive_create_notes_data(response.data.results)),
            error => console.log("fail ajax on home page", error)
        )
    }
}

/* This Section is for Delete the Note */
function request_delete__notes_data() {
    return {
        type: DELETE_NOTE_RECEIEVE_DATA
    }
}

function receive_delete_notes_data(data) {
    return {
        type: DELETE_NOTE_COMPLETED_DATA,
        deletenote: data
    }
}

export function delete_note(d) {
    return function (dispatch) {
        dispatch(request_delete__notes_data())
        return get(`https://api.openaq.org/v1/`).then(
            response => dispatch(receive_delete_notes_data(response.data.results)),
            error => console.log("fail ajax on home page", error)
        )
    }
}


/* This Section is for Update the Note */
function request_update__notes_data() {
    return {
        type: UPDATE_NOTE_RECEIEVE_DATA
    }
}

function receive_update_notes_data(data) {
    return {
        type: UPDATE_NOTE_COMPLETED_DATA,
        updatenote: data
    }
}

export function update_note(d) {
    return function (dispatch) {
        dispatch(request_update__notes_data())
        return get(`https://api.openaq.org/v1/`).then(
            response => dispatch(receive_update_notes_data(response.data.results)),
            error => console.log("fail ajax on home page", error)
        )
    }
}