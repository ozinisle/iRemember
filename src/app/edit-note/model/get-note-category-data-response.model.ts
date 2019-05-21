
import { NoteItemCategory } from 'src/shared/models/note-item.model';
import { CategoryTagEntityInterface, CategoryTagDataInterface, GetNoteCategoryDataResponseInterface } from './interface/get-note-category-data-response.interface';
import { GenericResponseModel } from 'src/shared/models/generic-items.model';


export class GetNoteCategoryDataResponseModel extends GenericResponseModel implements GetNoteCategoryDataResponseInterface {
    matchingRecords: CategoryTagData;
}

export class CategoryTagData implements CategoryTagDataInterface {
    public categoryTagData: CategoryTagEntity[];

    getCategoryTagData(): CategoryTagEntity[] {
        return this.categoryTagData;
    }

    setCategoryTagData(categoryTagData: CategoryTagEntity[]): CategoryTagData {
        this.categoryTagData = categoryTagData;
        return this;
    }
}

export class CategoryTagEntity implements CategoryTagEntityInterface {
    public categoryGroupHeader: string;
    public categoryTags: NoteItemCategory[];

    getCategoryGroupHeader(): string {
        return this.categoryGroupHeader;
    }
    setCategoryGroupHeader(categoryGroupHeader: string): CategoryTagEntity {
        this.categoryGroupHeader = categoryGroupHeader;
        return this;
    }

    getCategoryTags(): NoteItemCategory[] {
        return this.categoryTags;
    }
    setCategoryTags(categoryTags: NoteItemCategory[]): CategoryTagEntity {
        this.categoryTags = categoryTags;
        return this;
    }
}