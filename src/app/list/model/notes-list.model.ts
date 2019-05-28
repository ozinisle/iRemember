import { NotesListSearchQueryInterface } from './interface/notes-list.interface';

export class NotesListSearchQueryModel implements NotesListSearchQueryInterface {
    notesTitleContains: string = '';
    categoryTagNames: string = '';
    notesDescriptionContains: string = '';
    softDeletedDataOnly: boolean = false;
}