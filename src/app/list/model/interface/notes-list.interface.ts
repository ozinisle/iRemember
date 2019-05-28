export interface NotesListSearchQueryInterface {
    notesTitleContains: string;
    categoryTagNames: string;
    notesDescriptionContains: string;
    softDeletedDataOnly: boolean;

}