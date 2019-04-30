import {
    MatrixRegistrationRequestModelInterface,
    MatrixRegistrationResponseModelInterface
} from './interfaces/registration-model.interface';
import { GenericResponseModel } from './generic-items.model';
export class MatrixRegistrationRequestModel implements MatrixRegistrationRequestModelInterface {
    username: string;
    password: string;
    appName: string;
}
// tslint:disable-next-line:no-empty-interface
export class MatrixRegistrationResponseModel extends GenericResponseModel implements MatrixRegistrationResponseModelInterface {
}
