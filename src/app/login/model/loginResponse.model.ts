import { IRemLoginResponseInterface } from './interface/loginResponse.interface';

export class IRemLoginResponseModel implements IRemLoginResponseInterface {
    isAuthenticated: string;
    token: string;
    authenticatedUserName: string;
    displayMessage: string;
}