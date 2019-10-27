import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import Home from '../component/Home'
import { fetch_getnotes_data, crete_note } from '../action/index'
import { selectors_home } from '../selector/index'

const mapStateToProps = (state) => {
    const { getnotes, createnote } = selectors_home(state)
    return { getnotes, createnote }
}
const actions = {
    fetch_getnotes_data: fetch_getnotes_data,
    create_node: crete_note
};

// Get actions and pass them as props 
function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))
