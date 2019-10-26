import { createSelector } from 'reselect';

export const dashboardlist_data = state => state.data
export const selected_dashboardlist_data = createSelector(
    dashboardlist_data,
    data => data
)
