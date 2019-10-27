import axios from 'axios';
import {
    GET_NOTE_RECEIEVE_DATA, GET_NOTE_COMPLETED_DATA,
    CREATE_NOTE_RECEIEVE_DATA, CREATE_NOTE_COMPLETED_DATA,
    DELETE_NOTE_RECEIEVE_DATA, DELETE_NOTE_COMPLETED_DATA,
    UPDATE_NOTE_RECEIEVE_DATA, UPDATE_NOTE_COMPLETED_DATA
} from './ActionConstant'
import config from '../../config';


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
        return axios.get(`http://localhost:3003/api/tasks`).then(
            response => dispatch(receive_getnotes_data(response.data && response.data.length > 0 ? response.data.result : [])),
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

export function crete_note(title, note) {
    return function (dispatch) {
        dispatch(request_create_notes_data())
        return axios.post(`http://localhost:3003/api/tasks`, {
            headers: {
                'content-type': 'application/json '
            }
        }, {
            data: {
                title: title,
                note: note
            }
        }).then(
            response => dispatch(receive_create_notes_data(response.data.result[0])),
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

export function delete_note(id) {
    return function (dispatch) {
        dispatch(request_delete__notes_data())
        return axios.delete(`http://localhost:3003/api/tasks/` + id).then(
            response => dispatch(receive_delete_notes_data(response.data.result[0])),
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

export function update_note(id, title, note) {
    return function (dispatch) {
        dispatch(request_update__notes_data())
        return axios.put(`http://localhost:3003/api/tasks/` + id, {
            headers: {
                'content-type': 'application/json '
            }
        }, {
            data: {
                title: title,
                note: note
            }
        }).then(
            response => dispatch(receive_update_notes_data(response.data.result[0])),
            error => console.log("fail ajax on home page", error)
        )
    }
}