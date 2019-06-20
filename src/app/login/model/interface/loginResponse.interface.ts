export interface IRemLoginResponseInterface {
    isAuthenticated: boolean;
    token: string;
    authenticatedUserName: string;
    displayMessage: string;
    logs: string[];
}