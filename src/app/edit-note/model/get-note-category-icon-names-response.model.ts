import { GetNoteCategoryIconNamesResponseInterface, CategoryIconNamesInterface } from './interface/get-note-category-icon-names-response.interface';
import { GenericResponseModel } from 'src/shared/models/generic-items.model';

export class GetNoteCategoryIconNamesResponseModel extends GenericResponseModel implements GetNoteCategoryIconNamesResponseInterface {
    matchingRecords: CategoryIconNames;
}

export class CategoryIconNames implements CategoryIconNamesInterface {
    private categoryIconNames: string[];

    getCategoryIconNames(): string[] {
        return this.categoryIconNames;
    }

    setCategoryIconNames(categoryIconNames: string[]): CategoryIconNames {
        this.categoryIconNames = categoryIconNames;
        return this;
    }

}
