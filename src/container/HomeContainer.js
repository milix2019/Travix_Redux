import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import Home from '../component/Home'
import { fetch_dashboardlist_data } from '../action/index'
import { selectors_home } from '../selector/index'

const mapStateToProps = (state) => {
    const { dashboardlist_data } = selectors_home(state)
    return { dashboardlist_data }
}
const actions = {
    fetch_dashboardlist_data: fetch_dashboardlist_data,
};

// Get actions and pass them as props 
function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))
