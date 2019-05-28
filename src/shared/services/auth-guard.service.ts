import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { MatrixCommunicationChannelEncryptionService } from './matrix-communication-channel-encryption.service';
@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    constructor(public auth: AuthService, private router: Router,
        private commChannelEncryptor: MatrixCommunicationChannelEncryptionService) { }
    canActivate(next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        const isAuthenticated = this.auth.isAuthenticated();

        if (isAuthenticated) {
            return true;
        } else {
            this.commChannelEncryptor.setEncryptedDataInSessionStorage('irem-target-route', state.url);
            this.router.navigate(['/login']);
            return false;
        }
    }
}