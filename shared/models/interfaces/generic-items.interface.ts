export type GenericResponseStatusType = 'SUCCESS' | 'FAILURE';
export interface GenericResponseModelInterface {
    status: GenericResponseStatusType;
    errorMessage: string;
    displayMessage: string;
    responseCode: string;
    matchingRecords: any;
}

export interface GenericRecordItemsInterface {
    created: string;
    lastupdated: string;

    getCreated(): string;
    setCreated(created: string): GenericRecordItemsInterface;

    getLastupdated(): string;
    setLastupdated(lastupdated: string): GenericRecordItemsInterface;
}