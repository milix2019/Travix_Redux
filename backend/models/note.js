
/*
    is_deleted:
    to give better statistic to user, 
    give user oppotunity to be able to recover old deleted nots,
    in case, ask for authentication for security
*/
const Note = {
    id: Number,
    title: String,
    note : String,
    is_deleted: Boolean,
    update_at: Date,
    create_at: Date
};

module.exports = Note;