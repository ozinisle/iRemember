export type MatrixGenericResponseStatusType = 'SUCCESS' | 'FAILURE';
export interface MatrixGenericResponseModelInterface {
    status: MatrixGenericResponseStatusType;
    errorMessage: string;
    displayMessage: string;
}
