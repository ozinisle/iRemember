export type GenericResponseStatusType = 'SUCCESS' | 'FAILURE';
export interface GenericResponseModelInterface {
    status: GenericResponseStatusType;
    errorMessage: string;
    displayMessage: string;
    responseCode: string;
    matchingRecords: any;
}

export interface GenericRecordItemsInterface {
    getCreated(): string;
    getLastupdated(): string;

    setCreated(created: string): GenericRecordItemsInterface;
    setLastupdated(lastupdated: string): GenericRecordItemsInterface;
}