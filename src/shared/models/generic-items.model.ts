import { GenericResponseModelInterface, GenericResponseStatusType, GenericRecordItemsInterface } from './interfaces/generic-items.interface';

export class GenericResponseModel implements GenericResponseModelInterface {
    status: GenericResponseStatusType;
    errorMessage: string;
    displayMessage: string;
    responseCode: string;
}

export class GenericRecordItems implements GenericRecordItemsInterface {
    created: string;
    lastupdated: string;
}