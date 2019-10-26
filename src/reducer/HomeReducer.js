import { DASHBOARDLIST_COMPLETED_DATA, DASHBOARDLIST_RECEIEVE_DATA } from '../action/ActionConstant';

const initate_state = {
    loading_dashboardlist_data: true,
    dashboardlist_data: [],
}

export function fetch_nasa_data_reducer(state = initate_state, action) {
    switch (action.type) {
        case DASHBOARDLIST_RECEIEVE_DATA:
            return Object.assign({}, state, {
                ...state,
                loading_dashboardlist_data: true
            })
        case DASHBOARDLIST_COMPLETED_DATA:
            return Object.assign({}, state, {
                ...state,
                loading_dashboardlist_data: false,
                dashboardlist_data: action.dashboardlist_data
            })
        default:
            return state;
    }
}