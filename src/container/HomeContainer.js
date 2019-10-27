import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import Home from '../component/Home'
import { fetch_getnotes_data, crete_note, delete_note, update_note } from '../action/index'
import { selectors_home } from '../selector/index'

const mapStateToProps = (state) => {
    const { getnotes, createnote, deletenote, updatenote } = selectors_home(state)
    return { getnotes, createnote, deletenote, updatenote }
}
const actions = {
    fetch_getnotes_data: fetch_getnotes_data,
    create_node: crete_note,
    delete_note: delete_note,
    update_note: update_note
};

// Get actions and pass them as props 
function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))
