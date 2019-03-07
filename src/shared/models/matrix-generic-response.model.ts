import {
    MatrixGenericResponseModelInterface,
    MatrixGenericResponseStatusType
} from './interfaces/matrix-generic-response-models.interface';
export class MatrixGenericResponseModel implements MatrixGenericResponseModelInterface {
    status: MatrixGenericResponseStatusType;
    errorMessage: string;
    displayMessage: string;
}