import { environment } from '../environments/environment';

export const IRemember = Object.freeze({
    apiEndPoints: {
        login: `${environment.apiSourceDomain}/matrix-agents/authentication/authenticate-user.php`
    }
})