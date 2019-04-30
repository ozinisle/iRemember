import { GenericRecordItemsInterface } from './generic-items.interface';

export interface NoteItemInterface extends GenericRecordItemsInterface {
    isMarkedForDeletion: boolean;
    getNoteTitle(): string;
    setNoteTitle(noteTitle: string): NoteItemInterface;
    getNoteDescriptionItems(): string;
    setNoteDescriptionItems(noteDescription: string): NoteItemInterface;
    getIonicIconName(): string;
    setIonicIconName(ionicIconName: string): NoteItemInterface;
    getNoteId(): string;
    setNoteId(noteId: string): NoteItemInterface;
    getCategoryTags(): NoteItemCategoryInterface[];
    setCategoryTags(categoryTags: NoteItemCategoryInterface[]): NoteItemInterface;
}

export interface NoteDescriptionItemInterface {
    isMarkedForDeletion: boolean;
    itemValue: string;
    itemId: string;
}

export interface NoteItemCategoryInterface {
    isMarkedForDeletion: boolean;
    categoryId: string;
    categoryName: string;
}