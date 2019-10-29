import axios from 'axios';
import { GET_NOTE_RECEIEVE_DATA, GET_NOTE_COMPLETED_DATA } from './ActionConstant';
import config from '../../config';

/* 
    This Section is for getting all the data,
    calling fetch_getnotes_data Action from the UI 
*/

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
        return axios.get(config.BASE_URL + `tasks`).then(
            response => {
                dispatch(receive_getnotes_data(response.data.result));
            },
            error => console.log("fail ajax on home page", error)
        )
    }
}