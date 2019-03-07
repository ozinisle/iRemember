import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { MatrixConstants } from '../../shared/constants/matrix.constants';
@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }
    getAll() {
        return this.http.get<User[]>(`${MatrixConstants.url.apiUrl}/users`);
    }
    getById(id: number) {
        return this.http.get(`${MatrixConstants.url.apiUrl}/users/` + id);
    }
    register(user: User) {
        return this.http.post(`${MatrixConstants.url.apiUrl}/users/register`, user);
    }
    update(user: User) {
        return this.http.put(`${MatrixConstants.url.apiUrl}/users/` + user.id, user);
    }
    delete(id: number) {
        return this.http.delete(`${MatrixConstants.url.apiUrl}/users/` + id);
    }
}