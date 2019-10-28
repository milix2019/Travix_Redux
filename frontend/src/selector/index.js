import { selected_getnotes, selected_createnote, selected_deletenote, selected_updatenote, selected_searchnote } from './HomeSelector'

export const selectors_home = (state) => {
    const getnotes = selected_getnotes(state);
    const createnote = selected_createnote(state);
    const deletenote = selected_deletenote(state);
    const updatenote = selected_updatenote(state);
    const searchnote = selected_searchnote(state);
    
    return { getnotes, createnote, deletenote, updatenote, searchnote }
}