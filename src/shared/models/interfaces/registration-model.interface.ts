
import { MatrixGenericResponseModelInterface } from './matrix-generic-response-models.interface';
export interface MatrixRegistrationRequestModelInterface {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    email: string;
    mobile: string;
}
// tslint:disable-next-line:no-empty-interface
export interface MatrixRegistrationResponseModelInterface extends MatrixGenericResponseModelInterface {
}
