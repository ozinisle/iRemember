
import { MatrixGenericResponseModelInterface } from './matrix-generic-response-models.interface';
export interface MatrixRegistrationRequestModelInterface {
    username: string;
    password: string;
    appName: string;
}
// tslint:disable-next-line:no-empty-interface
export interface MatrixRegistrationResponseModelInterface extends MatrixGenericResponseModelInterface {
}
