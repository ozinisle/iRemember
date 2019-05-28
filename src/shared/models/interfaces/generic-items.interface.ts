export type GenericResponseStatusType = 'SUCCESS' | 'FAILURE';
export interface GenericResponseModelInterface {
    status: GenericResponseStatusType;
    errorMessage: string;
    displayMessage: string;
    responseCode: string;
}

export interface GenericRecordItemsInterface {
    created:string;
    lastupdated:string;
}