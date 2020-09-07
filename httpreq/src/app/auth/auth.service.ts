import { Injectable} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, from, Subject } from 'rxjs';
import {User} from './user.model';

export interface AuthResponseData{
    idToken: string;
    email:string;
    refreshToken: string;
    expiresIn: string;
    localId:string;
    registered? : boolean;
}

@Injectable({providedIn: 'root'})

export class AuthService {

    user = new Subject<User>();

    constructor(private http: HttpClient){}

    signup(email: string,password: string){
     return  this.http
        .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDUBE4E32BuUf6rpxcApBoXXx1nhfcQUoo',
       { email:email,
        password:password,
        returnSecureToken:true
       }
        ).pipe(catchError( this.handleError), tap(resData =>{
            this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);

           

        })
        );
    }
    login(email: string, password:string){
       return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDUBE4E32BuUf6rpxcApBoXXx1nhfcQUoo',

        {
            email:email,
            password:password,
            returnSecureToken:true
        }
        ).pipe(catchError(this.handleError),
        
        tap(resData =>{
            this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);

           

        })
        
        );
        
    }
    private handleAuthentication(email:string,localId:string,idToken,expiresIn:number){

        const expirationDate = new Date(new Date().getTime() + +expiresIn*1000)

        const user1 = new User(email,localId, idToken, expirationDate);
        this.user.next(user1);


    }
    private handleError(errorRes: HttpErrorResponse){
        let errorMessage = "Unknown error occured";
        if(!errorRes.error || !errorRes.error.error){
            return throwError(errorMessage);
        }
        switch(errorRes.error.error.message){
            case 'EMAIL_EXISTS':
                errorMessage ="email already exists";
                break;
                case 'EMAIL_NOT_FOUND':
                    errorMessage ="email doesn't found";
                    break;
                    
                    case 'INVALID_PASSWORD':
                        errorMessage ="invalid password";
                        break;

        }
        return throwError(errorMessage);


    }
}