
import { GenericResponseModelInterface } from './generic-items.interface';
export interface MatrixRegistrationRequestModelInterface {
    username: string;
    password: string;
    appName: string;
}
// tslint:disable-next-line:no-empty-interface
export interface MatrixRegistrationResponseModelInterface extends GenericResponseModelInterface {
}
