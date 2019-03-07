import { environment } from '../../environments/environment';

export const IRemember = Object.freeze({
    commonTerms: {
        currentUser: ''
    },
    apiEndPoints: {
        root: `${environment.apiSourceDomain}/matrix-agents`,
        login: `${environment.apiSourceDomain}/matrix-agents/authentication/authenticate-user.php`,
        authenticationUrl: 'authentication/authenticate-user.php',
        loginUrl: '/login',
        registrationUrl: 'authentication/register-user.php',
        signOutUrl: 'authentication/sign-out.php'
    },
    messages: {
        registrationSuccess: 'Registration successful',
    },
    values: {
        returnUrlParamKey: 'returnUrl',
    }
})