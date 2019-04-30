import { environment } from '../../environments/environment';

export const IRemember = Object.freeze({
    commonTerms: {
        currentUser: ''
    },
    apiEndPoints: {
        root: `${environment.apiSource}`,
        login: `${environment.apiSource}/authentication/authenticate-user.php`,
        loginUrl: '/login',
        register: `${environment.apiSource}/authentication/register-user.php`,
        signOutUrl: `${environment.apiSource}/authentication/sign-out.php`,
        sendVerificationEmail: `${environment.apiSource}/authentication/send-verification-email.php`,
        iRemUpdateNote: `${environment.apiSource}/irem-notes/update-note.php`,
    },
    messages: {
        registrationSuccess: 'Registration successful',
    },
    values: {
        returnUrlParamKey: 'returnUrl',
    }
})