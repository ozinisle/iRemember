import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class MatrixErrorHandlerService {
    constructor() { }
    handleError(error: Error): void {
        // code mail to mail errors - yet to happen
        // code to log errors to data - yet to happen
        throw error;
    }
}