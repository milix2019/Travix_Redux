import { selected_getnotes, selected_createnote } from './HomeSelector'

export const selectors_home = (state) => {
    const getnotes = selected_getnotes(state);
    const createnote = selected_createnote(state);
    
    return { getnotes, createnote }
}