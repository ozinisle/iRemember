import { GenericResponseModelInterface } from 'src/shared/models/interfaces/generic-items.interface';
import { NoteItemCategoryInterface } from 'src/shared/models/interfaces/note-item.interface';

export interface GetNoteCategoryIconNamesResponseInterface extends GenericResponseModelInterface {
    matchingRecords: CategoryIconNamesInterface;
}

export interface CategoryIconNamesInterface {
    //categoryIconNames: string[];

    getCategoryIconNames(): string[];
    setCategoryIconNames(categoryIconNames: string[]): CategoryIconNamesInterface;

}
