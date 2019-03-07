import { ViewNoteResolverDataInterface, EditNoteResolverDataInterface } from './interfaces/resolver-data.interface';
import { NoteItemInterface } from './interfaces/note-item.interface';
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