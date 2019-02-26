export interface NoteItemInterface {
    getNoteTitle(): string;
    setNoteTitle(noteTitle: string): NoteItemInterface;
    getNoteDescription(): string;
    setNoteDescription(noteDescription: string): NoteItemInterface;
    getIonicIconName(): string;
    setIonicIconName(ionicIconName: string): NoteItemInterface;
    getNoteId(): string;
    setNoteId(noteId: string): NoteItemInterface;
    getCategoryTags(): string[];
    setCategoryTags(categoryTags: string[]): NoteItemInterface;
}
