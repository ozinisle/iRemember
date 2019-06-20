import { IRemLoginResponseInterface } from './interface/loginResponse.interface';

export class IRemLoginResponseModel implements IRemLoginResponseInterface {
    isAuthenticated: boolean;
    token: string;
    authenticatedUserName: string;
    displayMessage: string;
    logs: string[];
}