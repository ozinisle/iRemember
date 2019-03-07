import {
    MatrixRegistrationRequestModelInterface,
    MatrixRegistrationResponseModelInterface
} from './interfaces/registration-model.interface';
import { MatrixGenericResponseModel } from './matrix-generic-response.model';
export class MatrixRegistrationRequestModel implements MatrixRegistrationRequestModelInterface {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    email: string;
    mobile: string;
}
// tslint:disable-next-line:no-empty-interface
export class MatrixRegistrationResponseModel extends MatrixGenericResponseModel implements MatrixRegistrationResponseModelInterface {
}
