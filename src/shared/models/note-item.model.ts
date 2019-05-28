import {
    NoteItemInterface,
    NoteDescriptionItemInterface,
    NoteItemCategoryInterface
} from './interfaces/note-item.interface';
import { GenericRecordItems } from './generic-items.model';
export class NoteItem extends GenericRecordItems implements NoteItemInterface {
    private noteTitle: string;
    private noteDescription: string;
    private ionicIconName: string;
    private noteId: string;
    private categoryTags: NoteItemCategory[];
    public isMarkedForDeletion: boolean;

    getNoteTitle(): string {
        return this.noteTitle;
    }
    setNoteTitle(noteTitle: string): NoteItem {
        this.noteTitle = noteTitle;
        return this;
    }
    getNoteDescriptionItems(): string {
        return this.noteDescription;
    }
    setNoteDescriptionItems(noteDescription: string): NoteItem {
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
    getCategoryTags(): NoteItemCategory[] {
        return this.categoryTags;
    }
    setCategoryTags(categoryTags: NoteItemCategory[]): NoteItem {
        this.categoryTags = categoryTags;
        return this;
    }
}

export class NoteDescriptionItem implements NoteDescriptionItemInterface {
    isMarkedForDeletion: boolean;
    itemValue: string;
    itemId: string;
}

export class NoteItemCategory implements NoteItemCategoryInterface {
    isMarkedForDeletion: boolean;
    categoryId: string;
    categoryName: string;
}
