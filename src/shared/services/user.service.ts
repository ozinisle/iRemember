import { Injectable } from '@angular/core';

import { User } from '../models/user';
import { IRemember } from '../constants/i-remember.constants';
import { ApiInteractionGatewayService } from '../api-interaction-gateway/api-interaction-gateway.service';

@Injectable()
export class UserService {
    constructor(private httpGateway: ApiInteractionGatewayService) { }
    getAll() {
        return this.httpGateway.doGet(`${IRemember.apiEndPoints.root}/users`);
    }
    getById(id: number) {
        return this.httpGateway.doGet(`${IRemember.apiEndPoints.root}/users/` + id);
    }
    register(user: User) {
        return this.httpGateway.doPost(`${IRemember.apiEndPoints.root}/users/register`, user);
    }
    update(user: User) {
        return this.httpGateway.doPut(`${IRemember.apiEndPoints.root}/users/` + user.id, user);
    }
    delete(id: number) {
        return this.httpGateway.doDelete(`${IRemember.apiEndPoints.root}/users/` + id);
    }
} 