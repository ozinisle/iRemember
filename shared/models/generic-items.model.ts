import { GenericResponseModelInterface, GenericResponseStatusType, GenericRecordItemsInterface } from './interfaces/generic-items.interface';

export class GenericResponseModel implements GenericResponseModelInterface {
    status: GenericResponseStatusType;
    errorMessage: string;
    displayMessage: string;
    responseCode: string;
    matchingRecords: any;
}

export class GenericRecordItems implements GenericRecordItemsInterface {
    public created: string;
    public lastupdated: string;

    getCreated(): string {
        return this.created;
    }
    getLastupdated(): string {
        return this.lastupdated;
    }

    setCreated(created: string): GenericRecordItems {
        this.created = created;
        return this;
    }
    setLastupdated(lastupdated: string): GenericRecordItems {
        this.lastupdated = lastupdated;
        return this;
    }
}