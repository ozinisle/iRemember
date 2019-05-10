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
    private markedForDeletion: boolean;

    isMarkedForDeletion(): boolean {
        return this.markedForDeletion;
    }

    setMarkedForDeletion(markedForDeletion: boolean): NoteItem {
        this.markedForDeletion = markedForDeletion;
        return this;
    }

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
    getCategoryTags(): NoteItemCategory[] {
        return this.categoryTags;
    }
    setCategoryTags(categoryTags: NoteItemCategory[]): NoteItem {
        this.categoryTags = categoryTags;
        return this;
    }
}

export class NoteDescriptionItem implements NoteDescriptionItemInterface {
    private markedForDeletion: boolean;
    private itemValue: string;
    private itemId: string;

    isMarkedForDeletion(): boolean {
        return this.markedForDeletion;
    }

    setMarkedForDeletion(markedForDeletion: boolean): NoteDescriptionItem {
        this.markedForDeletion = markedForDeletion;
        return this;
    }

    getItemValue(): string {
        return this.itemValue;
    }

    setItemValue(itemValue: string): NoteDescriptionItem {
        this.itemValue = itemValue;
        return this;
    }

    getItemId(): string {
        return this.itemId;
    }

    setItemId(itemId: string): NoteDescriptionItem {
        this.itemId = itemId;
        return this;
    }
}

export class NoteItemCategory implements NoteItemCategoryInterface {
    public markedForDeletion: boolean;
    public categoryId: string;
    public categoryName: string;
    public iconName: string;
    public categoryDescription: string;
    public selected: boolean;

    isSelected(): boolean {
        return this.selected;
    }

    setSelected(selected: boolean): NoteItemCategory {
        this.selected = selected;
        return this;
    }

    getIconName(): string {
        return this.iconName;
    }

    setIconName(iconName: string): NoteItemCategory {
        this.iconName = iconName;
        return this;
    }

    getCategoryDescription(): string {
        return this.categoryDescription;
    }

    setCategoryDescription(categoryDescription: string): NoteItemCategory {
        this.categoryDescription = categoryDescription;
        return this;
    }

    isMarkedForDeletion(): boolean {
        return this.markedForDeletion;
    }

    setMarkedForDeletion(markedForDeletion: boolean): NoteItemCategory {
        this.markedForDeletion = markedForDeletion;
        return this;
    }

    getCategoryId(): string {
        return this.categoryId;
    }

    setCategoryId(categoryId: string): NoteItemCategory {
        this.categoryId = categoryId;
        return this;
    }


    getCategoryName(): string {
        return this.categoryName;
    }

    setCategoryName(categoryName: string): NoteItemCategory {
        this.categoryName = categoryName;
        return this;
    }


}
