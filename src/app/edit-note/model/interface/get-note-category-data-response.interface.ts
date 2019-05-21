import { GenericResponseModelInterface } from 'src/shared/models/interfaces/generic-items.interface';
import { NoteItemCategoryInterface } from 'src/shared/models/interfaces/note-item.interface';

export interface GetNoteCategoryDataResponseInterface extends GenericResponseModelInterface {
    matchingRecords: CategoryTagDataInterface;
}

export interface CategoryTagDataInterface {
    categoryTagData: CategoryTagEntityInterface[];

    getCategoryTagData(): CategoryTagEntityInterface[];
    setCategoryTagData(categoryTagData: CategoryTagEntityInterface[]): CategoryTagDataInterface;
}

export interface CategoryTagEntityInterface {
    categoryGroupHeader: string;
    categoryTags: NoteItemCategoryInterface[];

    getCategoryGroupHeader(): string;
    setCategoryGroupHeader(categoryGroupHeader: string): CategoryTagEntityInterface;

    getCategoryTags(): NoteItemCategoryInterface[];
    setCategoryTags(categoryTags: NoteItemCategoryInterface[]): CategoryTagEntityInterface;
}

