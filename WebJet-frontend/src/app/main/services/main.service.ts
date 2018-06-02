import {Injectable}           from '@angular/core';
import {HttpClient, HttpHeaders}       from '@angular/common/http';
import {Observable}                from 'rxjs';

@Injectable()
export class MainService {

  
    constructor(
        private _http:HttpClient
    ){
    }

    public getAllMovies():Observable<object> {
        return this._http.get(`/api/movies`);

    }


}