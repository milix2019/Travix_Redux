import { selected_dashboardlist_data } from './HomeSelector'

export const selectors_home = (state) => {
    const dashboardlist_data = selected_dashboardlist_data(state);
    return { dashboardlist_data }
}