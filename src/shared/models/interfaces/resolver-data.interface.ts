import { NoteItemInterface } from './note-item.interface';
export interface ViewNoteResolverDataInterface {
getNote(): NoteItemInterface;
setNote(note: NoteItemInterface): ViewNoteResolverDataInterface;
}
export interface EditNoteResolverDataInterface extends ViewNoteResolverDataInterface {
isNewDoc(): boolean;
setNewDoc(newDocFlag: boolean): EditNoteResolverDataInterface;
}