import { NoteItemInterface } from './interfaces/note-item.interface';

export class NoteItem implements NoteItemInterface {
    noteTitle: string;

    noteDescription: string;

    ionicIconName: string;

    noteId: string;

    categoryTags: string[];


    getNoteTitle(): string {
        return this.noteTitle;
    }

    setNoteTitle(noteTitle: string): NoteItem {
        this.noteTitle = noteTitle;
        return this;
    }

    getNoteDescription(): string {
        return this.noteDescription;
    }

    setNoteDescription(noteDescription: string): NoteItem {
        this.noteDescription = noteDescription;
        return this;
    }

    getIonicIconName(): string {
        return this.ionicIconName;
    }

    setIonicIconName(ionicIconName: string): NoteItem {
        this.ionicIconName = ionicIconName;
        return this;
    }

    getNoteId(): string {
        return this.noteId;
    }

    setNoteId(noteId: string): NoteItem {
        this.noteId = noteId;
        return this;
    }

    getCategoryTags(): string[] {
        return this.categoryTags;
    }

    setCategoryTags(categoryTags: string[]): NoteItem {
        this.categoryTags = categoryTags;
        return this;
    }

}
