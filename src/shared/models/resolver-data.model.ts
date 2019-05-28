import { ViewNoteResolverDataInterface, EditNoteResolverDataInterface, GetNotesListResolverDataInterface } from './interfaces/resolver-data.interface';
import { NoteItemInterface } from './interfaces/note-item.interface';
import { NoteItem } from './note-item.model';
import { GenericResponseModelInterface } from './interfaces/generic-items.interface';
export class ViewNoteResolverData implements ViewNoteResolverDataInterface {
    private note: NoteItemInterface;
    getNote(): NoteItemInterface {
        return this.note;
    }
    setNote(note: NoteItemInterface): ViewNoteResolverData {
        this.note = note;
        return this;
    }
}
export class EditNoteResolverData extends ViewNoteResolverData implements EditNoteResolverDataInterface {
    private newDocFlag: boolean;
    isNewDoc(): boolean {
        return this.newDocFlag;
    }
    setNewDoc(newDocFlag: boolean): EditNoteResolverData {
        this.newDocFlag = newDocFlag;
        return this;
    }
}

export class GetNotesListResolverData implements GetNotesListResolverDataInterface {
    notesList: GenericResponseModelInterface;
}