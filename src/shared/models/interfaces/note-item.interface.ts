import { GenericRecordItemsInterface } from './generic-items.interface';

export interface NoteItemInterface extends GenericRecordItemsInterface {
    isMarkedForDeletion(): boolean;
    setMarkedForDeletion(markedForDeletion: boolean): NoteItemInterface;
    getNoteTitle(): string;
    setNoteTitle(noteTitle: string): NoteItemInterface;
    getNoteDescription(): string;
    setNoteDescription(noteDescription: string): NoteItemInterface;
    getIonicIconName(): string;
    setIonicIconName(ionicIconName: string): NoteItemInterface;
    getNoteId(): string;
    setNoteId(noteId: string): NoteItemInterface;
    getCategoryTags(): NoteItemCategoryInterface[];
    setCategoryTags(categoryTags: NoteItemCategoryInterface[]): NoteItemInterface;
}

export interface NoteDescriptionItemInterface {
    isMarkedForDeletion(): boolean;
    setMarkedForDeletion(markedForDeletion: boolean): NoteDescriptionItemInterface;
    getItemValue(): string;
    setItemValue(itemValue: string): NoteDescriptionItemInterface;
    getItemId(): string;
    setItemId(itemId: string): NoteDescriptionItemInterface;
}

export interface NoteItemCategoryInterface {
    isMarkedForDeletion(): boolean;
    setMarkedForDeletion(markedForDeletion: boolean): NoteItemCategoryInterface;
    getCategoryId(): string;
    setCategoryId(categoryId: string): NoteItemCategoryInterface
    getCategoryName(): string;
    setCategoryName(categoryName: string): NoteItemCategoryInterface
    getIconName(): string;
    setIconName(iconName: string): NoteItemCategoryInterface;
    getCategoryDescription(): string;
    setCategoryDescription(categoryDescription: string): NoteItemCategoryInterface;
    isSelected(): boolean;
    setSelected(selected: boolean): NoteItemCategoryInterface;
}