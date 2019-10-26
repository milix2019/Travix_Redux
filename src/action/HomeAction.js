import { get, post } from 'axios';
import { DASHBOARDLIST_RECEIEVE_DATA, DASHBOARDLIST_COMPLETED_DATA } from './ActionConstant'



function request_dashboardlist_data() {
    return {
        type: DASHBOARDLIST_RECEIEVE_DATA
    }
}

function receive_dashboardlist_data(data) {
    return {
        type: DASHBOARDLIST_COMPLETED_DATA,
        dashboardlist_data: data
    }
}

export function fetch_dashboardlist_data(d) {
    return function (dispatch) {
        dispatch(request_dashboardlist_data())
        return get(`https://api.openaq.org/v1/`).then(
            response => dispatch(receive_dashboardlist_data(response.data.results)),
            error => console.log("fail ajax on home page", error)
        )
    }
}
